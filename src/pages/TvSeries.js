import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTV } from "../features/content/contentSlice";
import { Content, LoadingSpinner } from "../components";

const TvSeries = () => {
  const [searchQueryArray, setSearchQueryArray] = useState([]);
  const [queryLength, setQueryLength] = useState(0);
  const dispatch = useDispatch();
  const { tvSeriesData, isLoading, searchQueryAndLocation } = useSelector(
    (store) => store.content
  );
  //
  useEffect(() => {
    if (Object.entries(searchQueryAndLocation).length > 0){
      const {query, path} = searchQueryAndLocation
      const queriedItems = tvSeriesData.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setQueryLength(query.length)
      setSearchQueryArray(queriedItems)
    }
  },[searchQueryAndLocation])
  //
  useEffect(() => {
    dispatch(getTV());
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
