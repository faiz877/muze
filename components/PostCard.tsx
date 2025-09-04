import React from "react"
import Image from "next/image"
import FooterActions from "./FooterActions"

interface PostCardProps {
  author: string
  username: string
  timestamp: string
  content: string
  likes: number
  dislikes?: number
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
  dislikes,
  comments,
  reposts,
  views,
  imageUrl,
  isReply,
  boostedBy,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 w-full animate-fadeIn mb-4">
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
        <div className="w-8 h-8 bg-gray-300 rounded-full cursor-pointer transform hover:scale-110 hover:ring-2 hover:ring-orange-500/20 transition-all duration-200" />
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-gray-900">{author}</span>
          <span className="text-gray-500">@{username}</span>
          <span className="text-gray-400">· {timestamp}</span>
        </div>
      </div>

      {/* Content */}
      <p className="mt-3 text-gray-800 text-sm leading-relaxed">
        {content.length > 160 ? (
          <>
            {content.slice(0, 160)}...{" "}
            <span className="text-blue-500 cursor-pointer">Read more</span>
          </>
        ) : (
          content
        )}
      </p>

      {/* Optional image */}
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
      <FooterActions
        likes={likes}
        dislikes={dislikes}
        comments={comments}
        reposts={reposts}
        views={views}
      />
    </div>
  )
}

export default PostCard
