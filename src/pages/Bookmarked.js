import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { renderCurrentBookmarks, getUserBookmarks } from "../features/content/contentSlice";
import { Content, LoadingSpinner } from "../components";
import handleSearch from "../search/searchFunction";

const Bookmarked = () => {
  const [searchQueryArray, setSearchQueryArray] = useState([]);
  const [queryLength, setQueryLength] = useState(0);
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const [bookmarkedTVSeries, setBookmarkedTVSeries] = useState([]);
  const dispatch = useDispatch();
  const {
    bookmarkedContent,
    allContentData,
    isLoading,
    searchQueryAndLocation,
    searchQuery,
    userInfo
  } = useSelector((store) => store.content);
  //
  const sortCategories = () => {
    if (bookmarkedContent.length >= 1) {
      setBookmarkedMovies(
        bookmarkedContent.filter((marked) => marked.category === "Movie")
      );
      setBookmarkedTVSeries(
        bookmarkedContent.filter((marked) => marked.category === "TV Series")
      );
    }
  };
  //
  useEffect(() => {
    const queriedItems = handleSearch(searchQuery, bookmarkedContent);
    setSearchQueryArray(queriedItems);
    setQueryLength(searchQuery.length);
  }, [searchQuery, bookmarkedContent]);
  //
  useEffect(() => {
    // dispatch(renderCurrentBookmarks());
    dispatch(getUserBookmarks(userInfo))
  }, [allContentData]);
  //
  useEffect(() => {
    sortCategories();
  }, [bookmarkedContent]);
  //
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {queryLength <= 0 ? (
            <>
              {bookmarkedContent.length <= 0 && (
                <p className="col-start-2 col-end-12 grid place-items-center smTab:text-xl">
                  You don't have any bookmarked items!
                </p>
              )}
              {bookmarkedContent.length >= 1 &&
                bookmarkedMovies.length >= 1 && (
                  <Content
                    name={"Bookmarked Movies"}
                    contentData={bookmarkedMovies}
                  />
                )}
              {bookmarkedContent.length >= 1 &&
                bookmarkedTVSeries.length >= 1 && (
                  <Content
                    name={"Bookmarked TV-Series"}
                    contentData={bookmarkedTVSeries}
                  />
                )}
            </>
          ) : (
            <>
              {bookmarkedContent.length <= 0 && (
                <p className="col-start-2 col-end-12 grid place-items-center smTab:text-xl">
                  You don't have any bookmarked items!
                </p>
              )}
              {bookmarkedContent.length >= 1 && (
                <Content
                  name={`Found ${searchQueryArray.length} results for "${searchQueryAndLocation.query}"`}
                  contentData={searchQueryArray}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Bookmarked;
