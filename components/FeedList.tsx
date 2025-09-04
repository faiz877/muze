"use client"

import React, { useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import PostCard from "./PostCard"
import { AlertCircle, Inbox } from "lucide-react"
import PostSkeleton from "./PostSkeleton"

const generatePosts = (count: number, offset: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${offset + i + 1}`,
    author: "John Doe",
    username: "johndoe",
    timestamp: "1h",
    content: `This is a mock post #${offset + i + 1}`,
    likes: (offset + i + 1) * 17,
    dislikes: (offset + i + 1) * 3,
    comments: (offset + i + 1) * 5,
    reposts: (offset + i + 1) * 2,
    views: (offset + i + 1) * 100,
  }))
}

const FeedList: React.FC = () => {
  const [posts, setPosts] = useState(() => generatePosts(10, 0))
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState(false) // simulate error state toggle

  const fetchMorePosts = () => {
    if (posts.length >= 50) {
      setHasMore(false)
      return
    }
    setTimeout(() => {
      // simulate error every 25 posts (for testing)
      if (posts.length === 25) {
        setError(true)
        return
      }
      const newPosts = generatePosts(10, posts.length)
      setPosts((prev) => [...prev, ...newPosts])
    }, 1200)
  }

  // Error State
  if (error) {
    return (
      <div className="w-[600px] mx-auto mt-10 text-center text-gray-600">
        <AlertCircle className="mx-auto mb-2 text-red-500" size={32} />
        <p className="text-sm font-medium">Something went wrong.</p>
        <p className="text-xs text-gray-400">Please try again later.</p>
      </div>
    )
  }

  // Empty State
  if (posts.length === 0) {
    return (
      <div className="w-[600px] mx-auto mt-10 text-center text-gray-600">
        <Inbox className="mx-auto mb-2 text-gray-400" size={32} />
        <p className="text-sm font-medium">No posts yet</p>
        <p className="text-xs text-gray-400">Start following people to see posts here.</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[600px] mx-auto -mt-7 bg-[#F6F6F6] px-4 sm:px-0">
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMorePosts}
        hasMore={hasMore}
        loader={
            <div className="space-y-4 py-4">
                {[...Array(3)].map((_, i) => (
                <PostSkeleton key={i} />
                ))}
            </div>
        }
        endMessage={
          <p className="text-center text-sm text-gray-400 py-4">
            🎉 You’ve reached the end!
          </p>
        }
      >
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default FeedList
