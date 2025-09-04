import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-[#F6F6F6]">
      <div className="flex items-center flex-1">
        <div className="flex items-center gap-2 ml-25">
          <Image
            src="/muze-logo-3.svg"
            alt="Muze logo"
            width={20}
            height={20}
            className="rounded"
          />
          <span className="text-base font-bold text-black">Muze</span>
        </div>
        
        <div className="relative mx-auto w-[300px] ml-105">
          <input
            type="text"
            placeholder="Search or find something on Paper"
            className="text-sm w-full text-black placeholder:text-gray-400 placeholder:font-normal px-4 py-2 rounded-lg border border-transparent hover:border-gray-200 hover:shadow-sm transition-all duration-200"
        />
        </div>
      </div>

      <div className="flex items-center gap-4 mr-25">
        <button
            className="text-sm min-w-[120px] scale-90 px-4 py-1 text-white rounded-full bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90 hover:shadow-lg hover:shadow-orange-200/50 active:scale-95 transition-all duration-200"
        >
            New Post
        </button>

        <div className="cursor-pointer transform transition-transform duration-200 hover:scale-105">
          <Image
              src="/profile2.jpg"
              alt="Profile"
              width={40}
              height={20}
              className="rounded-full object-cover scale-90 ring-2 ring-transparent hover:ring-orange-500/20 transition-all duration-200"
          />
        </div>
        </div>

    </header>
  );
};

export default Header;