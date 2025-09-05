"use client"

import React, { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import PostCard from "./PostCard"
import { AlertCircle, Inbox } from "lucide-react"
import PostSkeleton from "./PostSkeleton"
import { useQuery, useSubscription } from "@apollo/client/react"
import { GET_POSTS, NEW_POST_SUBSCRIPTION } from "@/graphql/queries"

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
  imageUrl?: string
  isReply?: boolean
  dislikes?: number
  boostedBy?: string
}

interface PostsData {
  posts: Post[]
}

interface PostsVars {
  page: number
  limit: number
}

const FeedList: React.FC = () => {
  const { data, loading, error, fetchMore } = useQuery<PostsData, PostsVars>(
    GET_POSTS,
    {
      variables: { page: 1, limit: 10 },
      notifyOnNetworkStatusChange: true,
    }
  )

  const [posts, setPosts] = useState<Post[]>([])

  // Sync Apollo query data into local state
  useEffect(() => {
    if (data?.posts) {
      setPosts(data.posts)
    }
  }, [data])

  // Subscription for new posts
  const { data: subData } = useSubscription<{ newPost: Post }>(
    NEW_POST_SUBSCRIPTION
  )

  useEffect(() => {
    if (subData?.newPost) {
      setPosts((prev) => [subData.newPost, ...prev]) // prepend new post
    }
  }, [subData])

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
  if (!loading && posts.length === 0) {
    return (
      <div className="w-[600px] mx-auto mt-10 text-center text-gray-600">
        <Inbox className="mx-auto mb-2 text-gray-400" size={32} />
        <p className="text-sm font-medium">No posts yet</p>
        <p className="text-xs text-gray-400">
          Start following people to see posts here.
        </p>
      </div>
    )
  }

  // Loading State (initial load)
  if (loading && !data) {
    return (
      <div className="space-y-4 py-4 w-full max-w-[600px] mx-auto">
        {[...Array(3)].map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    )
  }

  // Infinite scroll handler
  const fetchMorePosts = () => {
    fetchMore({
      variables: {
        page: Math.floor(posts.length / 10) + 1,
        limit: 10,
      },
      updateQuery: (prev: PostsData, { fetchMoreResult }: { fetchMoreResult?: PostsData }) => {
        if (!fetchMoreResult || fetchMoreResult.posts.length === 0) {
          return prev
        }
        return {
          posts: [...prev.posts, ...fetchMoreResult.posts],
        }
      },
    })
  }

  return (
    <div className="w-full max-w-[600px] mx-auto -mt-7 bg-[#F6F6F6] px-4 sm:px-0">
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMorePosts}
        hasMore={true}
        loader={
          <div className="space-y-4 py-4">
            {[...Array(2)].map((_, i) => (
              <PostSkeleton key={i} />
            ))}
          </div>
        }
      >
        {posts.map((post: Post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default FeedList