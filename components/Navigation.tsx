import React from 'react';

const Navigation = () => {
  return (
    <div className="bg-[#F6F6F6] flex flex-col items-center py-5">
      <nav className="-mt-4 flex justify-start w-[600px] px-6 py-3 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-6">
          <a href="#" className="text-xs text-black font-semibold relative after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-orange-500 after:to-pink-500">For You</a>
          <a href="#" className="text-xs text-gray-500 relative after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-orange-500 after:to-pink-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 hover:text-black transition-colors duration-200">Following</a>
          <a href="#" className="text-xs text-gray-500 relative after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-orange-500 after:to-pink-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 hover:text-black transition-colors duration-200">Discover Feeds</a>
        </div>
      </nav>

      <div className="flex justify-between w-[600px] mt-4">
        <button className="flex items-center gap-1 text-xs px-4 py-2 bg-white rounded-full text-gray-500 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-black hover:shadow-sm active:bg-gray-100 transition-all duration-200">
            Latest ▾
        </button>
        <button className="flex items-center gap-1 text-xs px-4 py-2 bg-white rounded-full text-gray-500 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-black hover:shadow-sm active:bg-gray-100 transition-all duration-200">
            Worldwide ▾
        </button>
       </div>
    </div>
  );
};

export default Navigation;