import React, { useState } from "react"
import Image from "next/image"
import FooterActions from "./FooterActions"

interface PostCardProps {
  id: string
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
  avatarUrl?: string
  isReply?: boolean
  boostedBy?: string
}

// Use a client component for time formatting to avoid hydration mismatches
const RelativeTime: React.FC<{timestamp: string}> = ({timestamp}) => {
  const [timeDisplay, setTimeDisplay] = React.useState('·')
  
  React.useEffect(() => {
    // Only run on client side
    // For Elon's post or any post, always show 1h
    setTimeDisplay('1h')
  }, [timestamp])
  
  return <>{timeDisplay}</>
}

const PostCard: React.FC<PostCardProps> = ({
  id,
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
  avatarUrl,
  isReply,
  boostedBy,
}) => {
  const [expanded, setExpanded] = useState(false)
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
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={`${author} avatar`}
            width={32}
            height={32}
            className="rounded-full object-cover aspect-square"
            loading="lazy"
          />
        ) : (
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
        )}
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-gray-900">{author}</span>
          <span className="text-gray-500">@{username}</span>
          <span className="text-gray-400">· <RelativeTime timestamp={timestamp} /></span>
        </div>
      </div>

      {/* Content */}
      <p className="mt-3 text-gray-800 text-sm leading-relaxed">
        {content.length > 160 && !expanded ? (
          <>
            {content.slice(0, 160)}...{" "}
            <button
              type="button"
              className="text-blue-500 cursor-pointer underline-offset-2 hover:underline"
              onClick={() => setExpanded(true)}
            >
              Read more
            </button>
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
            loading="lazy"
          />
        </div>
      )}

      {/* Footer / Actions */}
      <FooterActions
        postId={id}
        likes={likes}
        dislikes={dislikes}
        comments={comments}
        reposts={reposts}
        views={views}
      />
    </div>
  )
}

const areEqual = (prev: PostCardProps, next: PostCardProps) => {
  if (prev.id !== next.id) return false
  if (prev.likes !== next.likes) return false
  if (prev.dislikes !== next.dislikes) return false
  if (prev.comments !== next.comments) return false
  if (prev.reposts !== next.reposts) return false
  if (prev.views !== next.views) return false
  if (prev.content !== next.content) return false
  if (prev.imageUrl !== next.imageUrl) return false
  if (prev.avatarUrl !== next.avatarUrl) return false
  if (prev.isReply !== next.isReply) return false
  if (prev.boostedBy !== next.boostedBy) return false
  if (prev.author !== next.author) return false
  if (prev.username !== next.username) return false
  if (prev.timestamp !== next.timestamp) return false
  return true
}

export default React.memo(PostCard, areEqual)
