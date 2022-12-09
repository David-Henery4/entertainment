import React from "react";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchQuery } from "../features/content/contentSlice";
import { searchIcon } from "../assets";

const SearchInput = () => {
  const { allContentData, moviesData, tvSeriesData, bookmarkedContent } =
    useSelector((store) => store.content);
  // const [searchQuery, setSearchQuery] = useState("");
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
    <div className="flex justify-center items-center gap-6 col-start-2 col-end-11 max-w-sm xl:col-start-4 xl:col-end-13 xl:row-start-1 xl:row-end-2">
      <img
        className="w-6 h-6 smTab:w-8 smTab:h-8"
        src={searchIcon}
        alt="search-icon"
      />
      <input
        className="text-base font-light w-full h-full outline-none bg-transparent"
        type="text"
        placeholder={placeholderText()}
        onChange={(e) => {
          // setSearchQuery(e.target.value);
          handleSearchQuery(e.target.value)
        }}
      />
    </div>
  );
};

export default SearchInput;
