import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getContent } from "../features/content/contentSlice";
import { Trending, Content, LoadingSpinner } from "../components";
import { useState } from "react";

const Home = () => {
  const [searchQueryArray, setSearchQueryArray] = useState([]);
  const [queryLength, setQueryLength] = useState(0);
  const dispatch = useDispatch();
  const { allContentData, trendingContent, isLoading, searchQueryAndLocation } =
    useSelector((store) => store.content);
  //
  useEffect(() => {
    if (Object.entries(searchQueryAndLocation).length > 0) {
      const { query, page } = searchQueryAndLocation;
      const queriedItems = allContentData.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setQueryLength(query.length);
      setSearchQueryArray(queriedItems);
    }
  }, [searchQueryAndLocation]);
  //
  useEffect(() => {
    dispatch(getContent());
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
