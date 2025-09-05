import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PostCard from '@/components/PostCard'
import { ApolloProvider } from '@apollo/client/react'
import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({ uri: '/graphql', cache: new InMemoryCache() })

const base = {
  id: '1',
  author: 'Alice',
  username: 'alice',
  timestamp: 'now',
  content: 'hello world',
  likes: 1,
  comments: 0,
  reposts: 0,
  views: 0,
}

describe('PostCard', () => {
  it('renders author, username, timestamp, and content', () => {
    render(
      <ApolloProvider client={client}>
        <PostCard {...base} />
      </ApolloProvider>
    )
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('@alice')).toBeInTheDocument()
    expect(screen.getByText(/now/)).toBeInTheDocument()
    expect(screen.getByText('hello world')).toBeInTheDocument()
  })

  it('truncates long content and shows Read more', () => {
    const longContent = 'x'.repeat(200)
    render(
      <ApolloProvider client={client}>
        <PostCard {...base} content={longContent} />
      </ApolloProvider>
    )
    expect(screen.getByText('Read more')).toBeInTheDocument()
  })

  it('renders optional image when imageUrl provided', () => {
    render(
      <ApolloProvider client={client}>
        <PostCard {...base} imageUrl="/img.png" />
      </ApolloProvider>
    )
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('renders indicators when boosted or isReply', () => {
    render(
      <ApolloProvider client={client}>
        <PostCard {...base} boostedBy="bob" isReply />
      </ApolloProvider>
    )
    expect(screen.getByText(/boosted this post/)).toBeInTheDocument()
    expect(screen.getByText(/Replied to their own post/)).toBeInTheDocument()
  })
})
