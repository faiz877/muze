import React from "react"
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Repeat2,
  Heart,
  Eye,
  MoreHorizontal,
} from "lucide-react"

interface FooterActionsProps {
  likes: number
  dislikes?: number
  comments: number
  reposts: number
  views: number
}

const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
  if (num >= 1000) return (num / 1000).toFixed(1) + "K"
  return num.toString()
}

const FooterActions: React.FC<FooterActionsProps> = ({
  likes,
  dislikes,
  comments,
  reposts,
  views,
}) => {
  return (
    <div className="flex items-center justify-between mt-3 text-gray-500">
      {/* Left actions */}
      <div className="flex items-center gap-3 text-xs">
        {/* Likes + Dislikes */}
        <div className="flex items-center gap-3 px-3 py-1 rounded-full bg-[#F6F6F6] border border-gray-200">
          <button className="flex items-center gap-1 hover:text-black">
            <ThumbsUp size={14} /> {formatNumber(likes)}
          </button>
          <span className="text-gray-300">|</span>
          <button className="flex items-center gap-1 hover:text-black">
            <ThumbsDown size={14} /> {formatNumber(dislikes || 0)}
          </button>
        </div>

        {/* Comments */}
        <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#F6F6F6] border border-gray-200 hover:text-black">
          <MessageCircle size={14} /> {formatNumber(comments)}
        </button>

        {/* Reposts */}
        <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#F6F6F6] border border-gray-200 hover:text-black">
          <Repeat2 size={14} /> {formatNumber(reposts)}
        </button>

        {/* Thanks */}
        <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#F6F6F6] border border-gray-200 hover:text-black">
          <Heart size={14} /> Thanks
        </button>
      </div>

      {/* Right side (views + menu) */}
      <div className="flex items-center gap-3 text-xs">
        <span className="flex items-center gap-1">
          <Eye size={14} /> {formatNumber(views)}
        </span>
        <button className="hover:text-black">
          <MoreHorizontal size={14} />
        </button>
      </div>
    </div>
  )
}

export default FooterActions
