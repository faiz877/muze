import FeedList from '@/components/FeedList';
import ErrorBoundary from '@/components/ErrorBoundary';
import { makeExecutableSchema } from "@graphql-tools/schema";
// Use require to avoid TS type resolution issues for this package in the app dir
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { addMocksToSchema } = require("@graphql-tools/mock");
import { graphql } from "graphql";
import { typeDefs as mockTypeDefs, resolvers as mockResolvers } from "@/graphql/mock/schema";

async function fetchInitialPosts() {
  const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === 'true'

  // When mocks are enabled, build and execute the same mocked schema on the server
  // so SSR data matches the client and avoids a first-paint flash.
  if (useMocks) {
    const baseSchema = makeExecutableSchema({ typeDefs: mockTypeDefs, resolvers: mockResolvers })
    const mockedSchema = addMocksToSchema({ schema: baseSchema, preserveResolvers: true })

    const QUERY = /* GraphQL */ `
      query GetPosts($page: Int!, $limit: Int!) {
        posts(page: $page, limit: $limit) {
          __typename
          id
          author
          username
          content
          likes
          comments
          reposts
          views
          timestamp
          imageUrl
          avatarUrl
          isReply
          parentPostId
        }
      }
    `

    const result = await graphql({
      schema: mockedSchema,
      source: QUERY,
      variableValues: { page: 1, limit: 10 },
    })
    // In case of any error, gracefully fall back to empty list
    return (result.data as any)?.posts ?? []
  }

  // Otherwise, fetch from the real HTTP endpoint
  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_HTTP || 'http://localhost:4000/graphql'
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query GetPosts($page: Int!, $limit: Int!) {
        posts(page: $page, limit: $limit) {
          __typename
          id
          author
          username
          content
          likes
          comments
          reposts
          views
          timestamp
          imageUrl
          isReply
          parentPostId
        }
      }`,
      variables: { page: 1, limit: 10 },
    }),
    // Revalidate frequently for fresh content
    next: { revalidate: 10 },
  })

  if (!res.ok) {
    return []
  }
  const json = await res.json()
  return json.data?.posts ?? []
}

export default async function Home() {
  const initialPostsData = await fetchInitialPosts()
  
  // Ensure data is serializable by converting to plain objects
  const initialPosts = initialPostsData.map(post => ({
    ...post,
    // Ensure timestamp is a string
    timestamp: post.timestamp ? post.timestamp.toString() : new Date().toISOString(),
  }))
  
  return (
    <div className="container mx-auto px-4 py-6">
      <ErrorBoundary>
        <FeedList initialPosts={initialPosts} />
      </ErrorBoundary>
    </div>
  );
}
