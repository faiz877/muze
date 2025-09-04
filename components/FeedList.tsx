"use client"

import React, { useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import PostCard from "./PostCard"

const generatePosts = (count: number, offset: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${offset + i + 1}`,
    author: "John Doe",
    username: "johndoe",
    timestamp: "1h",
    content: `This is a mock post #${offset + i + 1}`,
    likes: (offset + i + 1) * 17,   // deterministic
    dislikes: (offset + i + 1) * 3, // deterministic
    comments: (offset + i + 1) * 5,
    reposts: (offset + i + 1) * 2,
    views: (offset + i + 1) * 100,
  }))
}

const FeedList: React.FC = () => {
  const [posts, setPosts] = useState(() => generatePosts(10, 0))
  const [hasMore, setHasMore] = useState(true)

  const fetchMorePosts = () => {
    if (posts.length >= 50) {
      setHasMore(false)
      return
    }
    setTimeout(() => {
      const newPosts = generatePosts(10, posts.length)
      setPosts((prev) => [...prev, ...newPosts])
    }, 1200) // simulate network delay
  }

  return (
    <div className="w-[600px] mx-auto -mt-7 bg-[#F6F6F6]">
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMorePosts}
        hasMore={hasMore}
        loader={
          <p className="text-center text-sm text-gray-500 py-4">
            Loading more posts...
          </p>
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
