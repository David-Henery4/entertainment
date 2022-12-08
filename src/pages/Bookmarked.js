import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Content } from "../components";

// <p className="col-start-2 col-end-12 grid place-items-center">You dont't have any bookmarked items!</p>
//
// relative on main
// <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
//You don't have any bookmarked items!
//</p>; //

const Bookmarked = () => {
  const { bookmarkedContent } = useSelector((store) => store.content);
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const [bookmarkedTVSeries, setBookmarkedTVSeries] = useState([]);
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
    sortCategories();
  }, [bookmarkedContent]);
  //
  return (
    <>
      {bookmarkedContent.length <= 0 && (
        <p className="col-start-2 col-end-12 grid place-items-center smTab:text-xl">
          You don't have any bookmarked items!
        </p>
      )}
      {bookmarkedContent.length >= 1 &&
        bookmarkedMovies.length >= 1 && (
          <Content name={"Bookmarked Movies"} contentData={bookmarkedMovies} />
        )}
      {bookmarkedContent.length >= 1 &&
        bookmarkedTVSeries.length >= 1 && (
          <Content
            name={"Bookmarked TV-Series"}
            contentData={bookmarkedTVSeries}
          />
        )}
    </>
  );
};

export default Bookmarked;
