import React from "react"
import PostCard from "./PostCard"

const FeedList: React.FC = () => {
  const posts = [
    {
      id: "1",
      author: "Elon Musk",
      username: "elonmusk",
      timestamp: "1h",
      content:
        "By enabling high-speed, low-latency and affordable Internet globally, Starlink will do more to educate and lift people out of poverty than any NGO ever",
      likes: 19000,
      comments: 2000,
      reposts: 2300,
      views: 4300000,
    },
    {
      id: "2",
      author: "Barack Obama",
      username: "barackobama",
      timestamp: "May 8",
      content:
        "Michelle and I send our congratulations to a fellow Chicagoan, His Holiness Pope Leo XIV. This is a historic day for the United States, and we will pray for him as he begins the sacred work of leading the Catholic Church and setting an example for so many, regardless of faith.",
      likes: 429000,
      comments: 8700,
      reposts: 34000,
      views: 58000000,
      boostedBy: "michelleobama",
    },
    {
      id: "3",
      author: "Michelle Obama",
      username: "michelleobama",
      timestamp: "May 1",
      content:
        "It was such a joy speaking with Ms. Tina Knowles at her first book tour stop for Matriarch! Matriarch is more than a memoir—it’s a love letter to Black women, to our stories, to our families, and to the unshakeable strength that holds us all together. This is a must-read, and",
      likes: 5200,
      comments: 7800,
      reposts: 597,
      views: 1100000,
      isReply: true,
    },
  ]

  return (
    <div className="w-[600px] mx-auto -mt-7 space-y-4 bg-[#F6F6F6]">
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  )
}

export default FeedList
