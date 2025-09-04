import React from 'react';

const Navigation = () => {
  return (
    <div className="bg-[#F6F6F6] flex flex-col items-center py-5">
      <nav className="-mt-4 flex justify-start w-[600px] px-6 py-3 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-6">
          <a href="#" className="text-xs text-black font-semibold">For You</a>
          <a href="#" className="text-xs text-gray-500 hover:text-black">Following</a>
          <a href="#" className="text-xs text-gray-500 hover:text-black">Discover Feeds</a>
        </div>
      </nav>

      <div className="flex justify-between w-[600px] mt-4">
        <button className="flex items-center gap-1 text-xs px-4 py-2 bg-white rounded-full text-gray-500 border border-gray-200 hover:bg-gray-100">
            Latest ▾
        </button>
        <button className="flex items-center gap-1 text-xs px-4 py-2 bg-white rounded-full text-gray-500 border border-gray-200 hover:bg-gray-100">
            Worldwide ▾
        </button>
       </div>
    </div>
  );
};

export default Navigation;