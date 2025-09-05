"use client"
import React, { useState, useRef, useEffect } from "react"
import { useFeedStore } from "@/store/feedStore"

interface DropdownMenuProps {
  options: { label: string; onClick: () => void }[]
  postId?: string
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ options, postId = "global" }) => {
  const dropdownOpenPostId = useFeedStore((s) => s.dropdownOpenPostId)
  const setDropdownOpenPostId = useFeedStore((s) => s.setDropdownOpenPostId)
  const open = dropdownOpenPostId === postId
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        if (open) setDropdownOpenPostId(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setDropdownOpenPostId(open ? null : postId)}
        className="hover:text-black"
      >
        ⋯
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {options.map((opt, idx) => (
            <button
              key={idx}
              onClick={opt.onClick}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default DropdownMenu