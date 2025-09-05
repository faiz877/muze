"use client"

import { ApolloClient, InMemoryCache, HttpLink, split, ApolloLink, Observable } from "@apollo/client"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { createClient } from "graphql-ws"
import { getMainDefinition } from "@apollo/client/utilities"
import { SchemaLink } from "@apollo/client/link/schema"
import { makeExecutableSchema } from "@graphql-tools/schema"
// Use require to avoid TS type resolution issues for this package
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { addMocksToSchema } = require("@graphql-tools/mock")
import { typeDefs as sdl, resolvers as baseResolvers } from "./mock/schema"

// HTTP link for queries & mutations
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_HTTP || "http://localhost:4000/graphql",
})

// WebSocket link for subscriptions
const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: process.env.NEXT_PUBLIC_GRAPHQL_WS || "ws://localhost:4000/graphql",
          retryAttempts: 5,
          shouldRetry: () => true,
        })
      )
    : null

// Split traffic: queries/mutations → HTTP, subscriptions → WS
const splitLink =
  typeof window !== "undefined" && wsLink
    ? split(
        ({ query }) => {
          const def = getMainDefinition(query)
          return (
            def.kind === "OperationDefinition" &&
            def.operation === "subscription"
          )
        },
        wsLink,
        httpLink
      )
    : httpLink

const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === 'true'

let link: ApolloLink

if (useMocks) {
  // Build mocked schema
  const schema = makeExecutableSchema({ typeDefs: sdl, resolvers: baseResolvers })
  const mockedSchema = addMocksToSchema({ schema, preserveResolvers: true })

  // Mock subscription link that emits every 15s
  const mockSubLink = new ApolloLink(() =>
    new Observable((observer) => {
      const interval = setInterval(() => {
        observer.next({
          data: {
            newPost: {
              __typename: 'Post',
              id: String(Date.now()),
              author: 'Muze Daily',
              username: 'muze',
              content: 'Today we asked: what small habit improved your focus the most? Mine was batching notifications to twice a day. Share yours below.',
              likes: Math.floor(Math.random() * 50),
              comments: Math.floor(Math.random() * 10),
              reposts: Math.floor(Math.random() * 5),
              views: Math.floor(Math.random() * 1000),
              timestamp: new Date().toISOString(),
              imageUrl: null,
              avatarUrl: '/profile2.jpg',
              isReply: false,
              parentPostId: null,
            },
          },
        })
      }, 15000)
      return () => clearInterval(interval)
    })
  )

  const schemaLink = new SchemaLink({ schema: mockedSchema })

  link = split(
    ({ query }) => {
      const def = getMainDefinition(query)
      return def.kind === 'OperationDefinition' && def.operation === 'subscription'
    },
    mockSubLink,
    schemaLink
  )
} else {
  link = splitLink
}

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})