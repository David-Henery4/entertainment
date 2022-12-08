import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { renderCurrentBookmarks } from "../features/content/contentSlice";
import { Content, LoadingSpinner } from "../components";

const Bookmarked = () => {
  const { bookmarkedContent, allContentData, isLoading } = useSelector(
    (store) => store.content
  );
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const [bookmarkedTVSeries, setBookmarkedTVSeries] = useState([]);
  const dispatch = useDispatch();
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
    dispatch(renderCurrentBookmarks());
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
          {bookmarkedContent.length <= 0 && (
            <p className="col-start-2 col-end-12 grid place-items-center smTab:text-xl">
              You don't have any bookmarked items!
            </p>
          )}
          {bookmarkedContent.length >= 1 && bookmarkedMovies.length >= 1 && (
            <Content
              name={"Bookmarked Movies"}
              contentData={bookmarkedMovies}
            />
          )}
          {bookmarkedContent.length >= 1 && bookmarkedTVSeries.length >= 1 && (
            <Content
              name={"Bookmarked TV-Series"}
              contentData={bookmarkedTVSeries}
            />
          )}
        </>
      )}
    </>
  );
};

export default Bookmarked;
