import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getContentWithUpdatedBookmarks } from "../features/content/contentSlice";
import { Trending, Content, LoadingSpinner } from "../components";
import { useState } from "react";
import handleSearch from "../search/searchFunction";


const Home = () => {
  const [searchQueryArray, setSearchQueryArray] = useState([]);
  const [queryLength, setQueryLength] = useState(0);
  const dispatch = useDispatch();
  const {
    allContentData,
    trendingContent,
    userInfo,
    isLoading,
    searchQueryAndLocation,
    searchQuery,
  } = useSelector((store) => store.content);
  //
  useEffect(() => {
    const queriedItems = handleSearch(searchQuery,allContentData)
    setQueryLength(searchQuery.length)
    setSearchQueryArray(queriedItems)
  }, [searchQuery, allContentData]);
  //
  useEffect(() => {
    dispatch(getContentWithUpdatedBookmarks(userInfo));
  }, []);
  //
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
        {queryLength <= 0 ? (<>
          <Trending trendingData={trendingContent} />
          <Content
            name={"Recommended for you"}
            contentData={allContentData}
          />
        </>) : (
          <>
          <Content
            name={`Found ${searchQueryArray.length} results for "${searchQueryAndLocation.query}"`}
            contentData={searchQueryArray}
          />
        </>)}
        </>
      )}
    </>
  );
};

export default Home;
