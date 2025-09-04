import React, { useState } from "react"
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Heart,
  Eye,
  Zap
} from "lucide-react"
import DropdownMenu from "./DropdownMenu"

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
  likes: initialLikes,
  dislikes: initialDislikes,
  comments,
  reposts,
  views,
}) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [thanked, setThanked] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes || 0);

  const handleLike = () => {
    if (disliked) {
      setDisliked(false);
      setDislikes(prev => prev - 1);
    }
    if (!liked) {
      setLikes(prev => prev + 1);
    } else {
      setLikes(prev => prev - 1);
    }
    setLiked(!liked);
  };

  const handleDislike = () => {
    if (liked) {
      setLiked(false);
      setLikes(prev => prev - 1);
    }
    if (!disliked) {
      setDislikes(prev => prev + 1);
    } else {
      setDislikes(prev => prev - 1);
    }
    setDisliked(!disliked);
  };

  return (
    <div className="flex items-center justify-between mt-3 text-gray-500">
      {/* Left actions */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {/* Likes + Dislikes */}
        <div className="flex items-center gap-3 px-3 py-1 rounded-full bg-[#F6F6F6] border border-gray-200">
          <button 
            className={`flex items-center gap-1 transition-all duration-200 ${
              liked ? 'text-blue-500 scale-110' : 'hover:text-black hover:scale-105'
            }`}
            onClick={handleLike}
          >
            <ThumbsUp size={14} className={liked ? 'fill-current' : ''} /> {formatNumber(likes)}
          </button>
          <span className="text-gray-300">|</span>
          <button 
            className={`flex items-center gap-1 transition-all duration-200 ${
              disliked ? 'text-red-500 scale-110' : 'hover:text-black hover:scale-105'
            }`}
            onClick={handleDislike}
          >
            <ThumbsDown size={14} className={disliked ? 'fill-current' : ''} /> {formatNumber(dislikes)}
          </button>
        </div>

        {/* Comments */}
        <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#F6F6F6] border border-gray-200 hover:text-black transition-all duration-200 hover:scale-105">
          <MessageCircle size={14} /> {formatNumber(comments)}
        </button>

        {/* Reposts */}
        <button 
          className={`flex items-center gap-1 px-3 py-1 rounded-full bg-[#F6F6F6] border border-gray-200 transition-all duration-200 ${
            reposted ? 'text-green-500 scale-110' : 'hover:text-black hover:scale-105'
          }`}
          onClick={() => setReposted(!reposted)}
        >
          <Zap size={14} className={reposted ? 'fill-current' : ''} /> {formatNumber(reposts)}
        </button>

        {/* Thanks */}
        <button 
          className={`flex items-center gap-1 px-3 py-1 rounded-full bg-[#F6F6F6] border border-gray-200 transition-all duration-200 ${
            thanked ? 'text-red-500 scale-110' : 'hover:text-black hover:scale-105'
          }`}
          onClick={() => setThanked(!thanked)}
        >
          <Heart size={14} className={thanked ? 'fill-current' : ''} /> Thanks
        </button>
      </div>

      {/* Right side (views + menu) */}
      <div className="flex items-center gap-3 text-xs">
        <span className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-gray-100 transition-all duration-200 hover:text-black">
          <Eye size={14} /> {formatNumber(views)}
        </span>
        <DropdownMenu
    options={[
      { label: "Share", onClick: () => alert("Share clicked") },
      { label: "Report", onClick: () => alert("Report clicked") },
      { label: "Copy link", onClick: () => alert("Link copied!") },
    ]}
  />
      </div>
    </div>
  )
}

export default FooterActions
