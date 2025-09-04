import React from "react"

const PostSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 w-[600px] animate-pulse">
      {/* Author row */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
        <div className="flex flex-col gap-2">
          <div className="w-24 h-3 bg-gray-300 rounded" />
          <div className="w-16 h-3 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Content */}
      <div className="mt-3 space-y-2">
        <div className="w-full h-3 bg-gray-300 rounded" />
        <div className="w-5/6 h-3 bg-gray-200 rounded" />
      </div>

      {/* Footer */}
      <div className="mt-4 flex gap-3">
        <div className="w-16 h-6 bg-gray-200 rounded-full" />
        <div className="w-16 h-6 bg-gray-200 rounded-full" />
        <div className="w-16 h-6 bg-gray-200 rounded-full" />
      </div>
    </div>
  )
}

export default PostSkeleton