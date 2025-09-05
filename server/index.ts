import { ApolloServer } from "@apollo/server"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { PubSub } from "graphql-subscriptions"
import { PubSubAsyncIterableIterator } from "graphql-subscriptions/dist/pubsub-async-iterable-iterator"
import { createServer } from "http"
import { WebSocketServer } from "ws"
import { useServer } from "graphql-ws/use/ws"
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { expressMiddleware } from "@apollo/server/express4"

const typeDefs = `#graphql
  type Post {
    id: ID!
    author: String!
    username: String!
    content: String!
    likes: Int!
    comments: Int!
    reposts: Int!
    views: Int!
    timestamp: String!
    imageUrl: String
    isReply: Boolean!
    parentPostId: ID
  }

  type Query {
    posts(page: Int!, limit: Int!): [Post!]!
  }

  type Mutation {
    likePost(id: ID!): Post!
  }

  type Subscription {
    newPost: Post!
  }
`

interface Post {
  id: string
  author: string
  username: string
  content: string
  likes: number
  comments: number
  reposts: number
  views: number
  timestamp: string
  imageUrl: string | null
  isReply: boolean
  parentPostId: string | null
}

interface PubSubEvents {
  [event: string]: any
  NEW_POST: { newPost: Post }
}

const pubsub = new PubSub<PubSubEvents>()

const posts: Post[] = Array.from({ length: 30 }, (_, i) => ({
  id: `${i + 1}`,
  author: i % 2 === 0 ? "Elon Musk" : "Michelle Obama",
  username: i % 2 === 0 ? "elonmusk" : "michelleobama",
  content: `This is mock post #${i + 1}`,
  likes: Math.floor(Math.random() * 1000),
  comments: Math.floor(Math.random() * 200),
  reposts: Math.floor(Math.random() * 100),
  views: Math.floor(Math.random() * 10000),
  timestamp: new Date().toISOString(),
  imageUrl: null,
  isReply: false,
  parentPostId: null,
}))

const resolvers = {
  Query: {
    posts: (_: any, { page, limit }: { page: number; limit: number }) => {
      const start = (page - 1) * limit
      return posts.slice(start, start + limit)
    },
  },
  Mutation: {
    likePost: (_: any, { id }: { id: string }) => {
      const post = posts.find((p) => p.id === id)
      if (!post) throw new Error(`Post with id ${id} not found`)
      post.likes += 1
      return post
    },
  },
  Subscription: {
    newPost: {
      subscribe: () => new PubSubAsyncIterableIterator(pubsub as any, "NEW_POST") as any,
    },
  },
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

async function start() {
  const app = express()
  const httpServer = createServer(app)

  // WebSocket server for subscriptions
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  })

  useServer({ schema }, wsServer)

  // Apollo server for queries/mutations
  const server = new ApolloServer({ schema })
  await server.start()

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server) as any
  )

  const PORT = 4000
  httpServer.listen(PORT, () => {
    console.log(`🚀 Query/Mutation endpoint: http://localhost:${PORT}/graphql`)
    console.log(`🚀 Subscription endpoint (WS): ws://localhost:${PORT}/graphql`)
  })

  // Simulate new posts every 20s, start AFTER initial page load to avoid flashing
  const publishMockPost = () => {
    const newPost: Post = {
      id: String(Date.now()),
      author: "Muze Daily",
      username: "muze",
      content: "Question of the day: what small habit improved your focus the most? Mine was batching notifications.",
      likes: 0,
      comments: 0,
      reposts: 0,
      views: 0,
      timestamp: new Date().toISOString(),
      imageUrl: null,
      isReply: false,
      parentPostId: null,
    }
    posts.unshift(newPost)
    pubsub.publish("NEW_POST", { newPost })
    console.log("📢 Published new post:", newPost.id)
  }

  // delay first publication so users see initial feed first
  setTimeout(() => {
    publishMockPost()
    setInterval(publishMockPost, 20000)
  }, 20000)
}

start()