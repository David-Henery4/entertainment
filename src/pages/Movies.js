import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMovies } from "../features/content/contentSlice";
import { Content, LoadingSpinner } from "../components";
import handleSearch from "../search/searchFunction";


const Movies = () => {
  const [searchQueryArray, setSearchQueryArray] = useState([]);
  const [queryLength, setQueryLength] = useState(0);
  const { moviesData, isLoading, searchQueryAndLocation, searchQuery } =
    useSelector((store) => store.content);
  const dispatch = useDispatch();
  //
  useEffect(() => {
    const queriedItems = handleSearch(searchQuery, moviesData)
    setSearchQueryArray(queriedItems)
    setQueryLength(searchQuery.length)
  }, [searchQuery, moviesData]);
  //
  useEffect(() => {
    dispatch(getMovies());
  }, []);
  //
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {queryLength <= 0 ? (
            <Content name={"Movies"} contentData={moviesData} />
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

export default Movies;
