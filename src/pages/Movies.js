import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMovies } from "../features/content/contentSlice";
import { Content, LoadingSpinner } from "../components";

const Movies = () => {
  const [searchQueryArray, setSearchQueryArray] = useState([]);
  const [queryLength, setQueryLength] = useState(0);
  const { moviesData, isLoading, searchQueryAndLocation } = useSelector(
    (store) => store.content
  );
  const dispatch = useDispatch();
  //
  useEffect(() => {
    if (Object.entries(searchQueryAndLocation).length > 0) {
      const { query, page } = searchQueryAndLocation;
      const queriedItems = moviesData.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setQueryLength(query.length);
      setSearchQueryArray(queriedItems);
    }
  }, [searchQueryAndLocation]);
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
