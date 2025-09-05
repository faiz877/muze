import { gql } from '@apollo/client'
import { BASE_POSTS } from './data'

export const typeDefs = gql`
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
    avatarUrl: String
    boostedBy: String
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

// Create a repeating list of posts based on 20 base posts
// Export MOCK_POSTS so it can be accessed by apollo-client.ts
export const MOCK_POSTS: any[] = Array.from({ length: 100 }, (_, i) => {
  const base = BASE_POSTS[i % BASE_POSTS.length]
  const AVATAR_MAP: Record<string, string> = {
    elonmusk: '/elon.jpg',
    michelleobama: '/michelle.jpg',
    sundarpichai: '/sundar.jpg',
    satyanadella: '/satya.jpg',
    tim_cook: '/tim.jpg',
    ginnirometty: '/ginni.jpg',
    bchesky: '/chesky.jpg',
    patrickc: '/patrick.jpg',
    annewoj23: '/anne.jpg',
    naval: '/naval.jpg',
    paulg: '/paul.jpg',
    katherinej: '/katherine.jpg',
    ada: '/ada.jpg',
    gracehopper: '/grace.jpg',
    linus__: '/linus.jpg',
    gvanrossum: '/guido.jpg',
    sherylsandberg: '/sheryl.jpg',
    andrewyng: '/andrew.jpg',
    jeffbezos: '/bezos.jpg',
    stevejobs: '/jobs.jpg',
  }
  const avatarFromMap = AVATAR_MAP[base.username] || '/profile2.jpg'
  return {
    __typename: 'Post',
    id: String(i + 1),
    author: base.author,
    username: base.username,
    content: base.content,
    likes: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 200),
    reposts: Math.floor(Math.random() * 100),
    views: Math.floor(Math.random() * 10000),
    timestamp: new Date(Date.now() - i * 3600_000).toISOString(),
    imageUrl: base.imageUrl ?? null,
    avatarUrl: (base as any).avatarUrl || avatarFromMap,
    boostedBy: (base as any).boostedBy ?? null,
    isReply: Boolean(base.isReply) || false,
    parentPostId: null,
  }
})

export const resolvers = {
  Query: {
    posts: (_: unknown, { page, limit }: { page: number; limit: number }) => {
      const start = (page - 1) * limit
      return MOCK_POSTS.slice(start, start + limit)
    },
  },
  Mutation: {
    likePost: (_: unknown, { id }: { id: string }) => {
      const post = MOCK_POSTS.find((p) => p.id === id)
      if (!post) throw new Error('Post not found')
      post.likes += 1
      return post
    },
  },
}
