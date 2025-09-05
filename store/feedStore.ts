import { create } from "zustand"

export type MainTab = "forYou" | "following" | "discover"
export type SubTab = "latest" | "worldwide"

interface FeedState {
  activeTab: MainTab
  subTab: SubTab
  isNewPostModalOpen: boolean
  dropdownOpenPostId: string | null
  likedPosts: Record<string, boolean>

  setActiveTab: (tab: MainTab) => void
  setSubTab: (tab: SubTab) => void
  toggleNewPostModal: () => void
  setDropdownOpenPostId: (id: string | null) => void
  toggleLike: (postId: string) => void
}

export const useFeedStore = create<FeedState>((set, get) => ({
  activeTab: "forYou",
  subTab: "latest",
  isNewPostModalOpen: false,
  dropdownOpenPostId: null,
  likedPosts: {},

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSubTab: (tab) => set({ subTab: tab }),
  toggleNewPostModal: () => set((s) => ({ isNewPostModalOpen: !s.isNewPostModalOpen })),
  setDropdownOpenPostId: (id) => set({ dropdownOpenPostId: id }),
  toggleLike: (postId) => {
    const current = get().likedPosts[postId]
    set((s) => ({ likedPosts: { ...s.likedPosts, [postId]: !current } }))
  },
}))