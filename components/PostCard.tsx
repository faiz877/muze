import React from "react"
import Image from "next/image"

interface PostCardProps {
  author: string
  username: string
  timestamp: string
  content: string
  likes: number
  comments: number
  reposts: number
  views: number
  imageUrl?: string
  isReply?: boolean
  boostedBy?: string
}

const PostCard: React.FC<PostCardProps> = ({
  author,
  username,
  timestamp,
  content,
  likes,
  comments,
  reposts,
  views,
  imageUrl,
  isReply,
  boostedBy,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 w-[600px]">
      {/* Boosted or reply indicator */}
      {boostedBy && (
        <p className="text-xs text-gray-500 mb-2">
          🔁 @{boostedBy} boosted this post
        </p>
      )}
      {isReply && (
        <p className="text-xs text-gray-500 mb-2">↩ Replied to their own post</p>
      )}

      {/* Author row */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
        <div>
          <p className="text-sm font-semibold text-gray-800">{author}</p>
          <p className="text-xs text-gray-500">
            @{username} · {timestamp}
          </p>
        </div>
      </div>

      {/* Content */}
      <p className="mt-3 text-gray-700 text-sm leading-relaxed">
        {content.length > 140 ? (
          <>
            {content.slice(0, 140)}...{" "}
            <span className="text-blue-500 cursor-pointer">Read more</span>
          </>
        ) : (
          content
        )}
      </p>

      {imageUrl && (
        <div className="mt-3 rounded-lg w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt="Post media"
            className="object-cover"
            layout="responsive"
            width={600}
            height={400}
            priority
          />
        </div>
      )}

      {/* Footer / Actions */}
      <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
        <button className="flex items-center gap-1 hover:text-black">
          👍 {likes}
        </button>
        <button className="flex items-center gap-1 hover:text-black">
          💬 {comments}
        </button>
        <button className="flex items-center gap-1 hover:text-black">
          🔁 {reposts}
        </button>
        <button className="flex items-center gap-1 hover:text-black">
          👁 {views}
        </button>
      </div>
    </div>
  )
}

export default PostCard
