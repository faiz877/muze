import FeedList from '@/components/FeedList';
import ErrorBoundary from '@/components/ErrorBoundary';

async function fetchInitialPosts() {
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
  const initialPosts = await fetchInitialPosts()
  return (
    <div className="container mx-auto px-4 py-6">
      <ErrorBoundary>
        <FeedList initialPosts={initialPosts} />
      </ErrorBoundary>
    </div>
  );
}
