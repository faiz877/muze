import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

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

// Mock data
// Define interfaces for our types
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
    posts: (_parent: never, { page, limit }: { page: number; limit: number }) => {
      const start = (page - 1) * limit
      return posts.slice(start, start + limit)
    },
  },
  Mutation: {
    likePost: (_parent: never, { id }: { id: string }) => {
      const post = posts.find((p) => p.id === id)
      if (!post) {
        throw new Error(`Post with id ${id} not found`)
      }
      post.likes += 1
      return post
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const start = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  })
  console.log(`🚀 Server ready at ${url}`)
}

start()