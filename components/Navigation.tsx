"use client"
import React from 'react';
import { useFeedStore, type MainTab, type SubTab } from "@/store/feedStore";

const Navigation = () => {
  const activeTab = useFeedStore((s) => s.activeTab)
  const subTab = useFeedStore((s) => s.subTab)
  const setActiveTab = useFeedStore((s) => s.setActiveTab)
  const setSubTab = useFeedStore((s) => s.setSubTab)

  const tabClass = (tab: MainTab) =>
    `text-xs font-semibold relative after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-orange-500 after:to-pink-500 ${
      activeTab === tab ? 'text-black' : 'text-gray-500 after:scale-x-0 hover:after:scale-x-100 hover:text-black'
    } after:transition-transform after:duration-300 transition-colors duration-200`

  return (
    <div className="bg-[#F6F6F6] flex flex-col items-center py-5" role="navigation">
      <nav className="-mt-4 flex justify-start w-[600px] px-6 py-3 bg-white rounded-lg shadow-sm" aria-label="Main navigation">
        <div className="flex items-center gap-6" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'forYou'}
            aria-controls="for-you-content"
            className={tabClass('forYou')}
            onClick={() => setActiveTab('forYou')}
          >
            For You
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'following'}
            aria-controls="following-content"
            className={tabClass('following')}
            onClick={() => setActiveTab('following')}
          >
            Following
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'discover'}
            aria-controls="discover-content"
            className={tabClass('discover')}
            onClick={() => setActiveTab('discover')}
          >
            Discover Feeds
          </button>
        </div>
      </nav>

      <div className="flex justify-between w-[600px] mt-4" role="toolbar" aria-label="Content filters">
        <button 
          className={`flex items-center gap-1 text-xs px-4 py-2 bg-white rounded-full border ${subTab === 'latest' ? 'text-black border-gray-300' : 'text-gray-500 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-black'} hover:shadow-sm active:bg-gray-100 transition-all duration-200`}
          aria-label="Sort by: Latest"
          aria-haspopup="listbox"
          onClick={() => setSubTab('latest')}
        >
          Latest ▾
        </button>
        <button 
          className={`flex items-center gap-1 text-xs px-4 py-2 bg-white rounded-full border ${subTab === 'worldwide' ? 'text-black border-gray-300' : 'text-gray-500 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-black'} hover:shadow-sm active:bg-gray-100 transition-all duration-200`}
          aria-label="Filter by region: Worldwide"
          aria-haspopup="listbox"
          onClick={() => setSubTab('worldwide')}
        >
          Worldwide ▾
        </button>
      </div>
    </div>
  );
};

export default Navigation;