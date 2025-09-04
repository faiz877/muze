import React from "react"
import Image from "next/image"
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Heart,
  Eye,
  MoreHorizontal,
  Zap,
} from "lucide-react"

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

const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
  if (num >= 1000) return (num / 1000).toFixed(1) + "K"
  return num.toString()
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 w-[600px]">
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
<div className="flex items-center justify-between mt-3 text-gray-500">
  <div className="flex items-center gap-3">
    {/* Likes + Dislikes in one pill */}
    <div className="flex items-center gap-3 px-3 py-1 rounded-full bg-[#F6F6F6] border border-gray-200 text-xs">
      <button className="flex items-center gap-1 hover:text-black">
        <ThumbsUp size={14} /> {formatNumber(likes)}
      </button>
      <span className="text-gray-300">|</span>
      <button className="flex items-center gap-1 hover:text-black">
        <ThumbsDown size={14} /> {formatNumber(dislikes || 0)}
      </button>
    </div>

    {/* Comments */}
    <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#F6F6F6] border border-gray-200 text-xs hover:text-black">
      <MessageCircle size={14} /> {formatNumber(comments)}
    </button>

    {/* Reposts (Zap) */}
    <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#F6F6F6] border border-gray-200 text-xs hover:text-black">
      <Zap size={14} /> {formatNumber(reposts)}
    </button>

    {/* Thanks */}
    <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#F6F6F6] border border-gray-200 text-xs hover:text-black">
      <Heart size={14} /> Thanks
    </button>
  </div>

  {/* Views + Options */}
  <div className="flex items-center gap-3 text-xs">
    <span className="flex items-center gap-1">
      <Eye size={14} /> {formatNumber(views)}
    </span>
    <button className="hover:text-black">
      <MoreHorizontal size={14} />
    </button>
  </div>
</div>



    </div>
  )
}

export default PostCard
