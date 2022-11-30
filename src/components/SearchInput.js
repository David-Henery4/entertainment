import React from 'react'
import { searchIcon } from '../assets'

const SearchInput = () => {
  return (
    <div className="w-64 flex justify-center items-center gap-6 col-start-2 col-end-12">
      <img
        className="w-6 h-6"
        src={searchIcon}
        alt="search-icon"
      />
      <input
        className="text-base font-light w-full h-full outline-none bg-transparent border-b border-b-white"
        type="text"
      />
    </div>
  );
}

export default SearchInput