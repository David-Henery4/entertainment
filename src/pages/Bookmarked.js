import React from "react";
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

  return (
    <>
      {bookmarkedContent.length <= 0 ? (
        <p className="col-start-2 col-end-12 grid place-items-center smTab:text-xl">
          You don't have any bookmarked items!
        </p>
      ) : (
        <>
          <Content name={"Bookmarked Movies"} />
          <Content name={"Bookmarked TV-Series"} />
        </>
      )}
    </>
  );
};

export default Bookmarked;
