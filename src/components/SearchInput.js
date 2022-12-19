import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchQuery } from "../features/content/contentSlice";
import { searchIcon } from "../assets";

const SearchInput = () => {
  const dispatch = useDispatch()
  const location = useLocation();
  //
  const handleSearchQuery = (query) => {
    const page = location.pathname
    dispatch(searchQuery({query,page}))
  }
  //
  const placeholderText = () => {
    if (location.pathname === "/") return "Search for movies or TV shows";
    if (location.pathname === "/movies") return "Search for movies";
    if (location.pathname === "/tv") return "Search for TV shows";
    if (location.pathname === "/bookmarked") return "Search bookmarked";
  };
  //
  return (
    <div className="flex justify-start items-center gap-6 col-start-2 col-end-12 xl:col-start-4 xl:col-end-lrgMainGridBeforeEnd xl:row-start-1 xl:row-end-2">
      <img
        className="w-6 h-6 smTab:w-8 smTab:h-8"
        src={searchIcon}
        alt="search-icon"
      />
      <input
        className="text-base font-light w-full h-6 smTab:h-8 outline-none bg-transparent caret-red focus:border-b-greyishBlue focus:border-b-[1px]"
        type="text"
        placeholder={placeholderText()}
        onChange={(e) => {
          handleSearchQuery(e.target.value)
        }}
      />
    </div>
  );
};

export default SearchInput;
