import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import FeedList from '@/components/FeedList'
import { ApolloProvider } from '@apollo/client/react'
import { ApolloClient, InMemoryCache, ApolloLink, Observable } from '@apollo/client'
import * as apolloReact from '@apollo/client/react'

function createPosts(n: number, offset = 0) {
  return Array.from({ length: n }, (_, i) => ({
    __typename: 'Post',
    id: String(i + 1 + offset),
    author: `Author ${i + 1 + offset}`,
    username: `user${i + 1 + offset}`,
    content: `Content ${i + 1 + offset}`,
    likes: 0,
    comments: 0,
    reposts: 0,
    views: 0,
    timestamp: new Date().toISOString(),
    imageUrl: null,
    isReply: false,
    parentPostId: null,
  }))
}

describe('FeedList', () => {
  const useQueryMock = jest.spyOn(apolloReact, 'useQuery') as unknown as jest.Mock
  const useSubscriptionMock = jest.spyOn(apolloReact, 'useSubscription') as unknown as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
    useSubscriptionMock.mockReturnValue({ data: undefined })
  })

  const renderWithApollo = (ui: React.ReactElement) => {
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: new ApolloLink(() => new Observable(() => {})),
    })
    return render(<ApolloProvider client={client}>{ui}</ApolloProvider>)
  }
  it('renders loading skeletons when loading', () => {
    useQueryMock.mockReturnValue({ data: undefined, loading: true, error: undefined, fetchMore: jest.fn() })
    const { container } = renderWithApollo(<FeedList />)
    const pulses = container.querySelectorAll('.animate-pulse')
    expect(pulses.length).toBeGreaterThan(0)
  })

  it('renders error state when GraphQL query fails', async () => {
    useQueryMock.mockReturnValue({ data: undefined, loading: false, error: new Error('Network error'), fetchMore: jest.fn() })
    renderWithApollo(<FeedList />)
    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument()
    })
  })

  it('renders empty state when no posts are returned', async () => {
    useQueryMock.mockReturnValue({ data: { posts: [] }, loading: false, error: undefined, fetchMore: jest.fn() })
    renderWithApollo(<FeedList />)
    await waitFor(() => {
      expect(screen.getByText(/No posts yet/i)).toBeInTheDocument()
    })
  })

  it('renders posts when data is available', async () => {
    const posts = createPosts(2)
    useQueryMock.mockReturnValue({ data: { posts }, loading: false, error: undefined, fetchMore: jest.fn() })
    renderWithApollo(<FeedList />)
    await waitFor(() => {
      expect(screen.getByText(posts[0].content)).toBeInTheDocument()
      expect(screen.getByText(posts[1].content)).toBeInTheDocument()
    })
  })
})
