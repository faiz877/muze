"use client"

import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { createClient } from "graphql-ws"
import { getMainDefinition } from "@apollo/client/utilities"

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

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})