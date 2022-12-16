import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTV, getTvWithUpdatedBookmarks } from "../features/content/contentSlice";
import { Content, LoadingSpinner } from "../components";
import handleSearch from "../search/searchFunction";


const TvSeries = () => {
  const [searchQueryArray, setSearchQueryArray] = useState([]);
  const [queryLength, setQueryLength] = useState(0);
  const dispatch = useDispatch();
  const { tvSeriesData, isLoading, searchQueryAndLocation, searchQuery, userInfo } =
    useSelector((store) => store.content);
  //
  useEffect(() => {
    const queriedItems = handleSearch(searchQuery,tvSeriesData)
    setQueryLength(searchQuery.length)
    setSearchQueryArray(queriedItems)
  },[searchQuery, tvSeriesData])
  //
  useEffect(() => {
    // dispatch(getTV());
    dispatch(getTvWithUpdatedBookmarks(userInfo))
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {queryLength <= 0 ? (
            <Content name={"TV Series"} contentData={tvSeriesData} />
          ) : (
            <Content
              name={`Found ${searchQueryArray.length} results for "${searchQueryAndLocation.query}"`}
              contentData={searchQueryArray}
            />
          )}
        </>
      )}
    </>
  );
};

export default TvSeries;
