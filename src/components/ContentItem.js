import React from "react";
import { greatLandsThumbSml, bookmarkIcon, movieIcon } from "../assets";

const ContentItem = () => {
  return (
    <div className="grid gap-2 w-full">
      {/* IMAGE & BOOKMARK ICON */}
      <div className="relative w-full">
        {/* temp w&h for img */}
        <div className="grid place-items-center absolute z-10 top-2 right-2 w-8 h-8 rounded-full bg-darkBlue/50">
          <img src={bookmarkIcon} alt="bookmark-icon" />
        </div>
        {/* h-[110px] */}
        <img className="w-full rounded-lg" src={greatLandsThumbSml} alt="thumbnail" />
      </div>
      {/* TEXT INFO */}
      <div className="z-10 relative flex flex-col justify-center items-start">
        <div className="flex justify-center items-center gap-2 text-xs smTab:text-bodySml text-white/75">
          <p>2019</p>
          <div className="w-[3px] h-[3px] bg-white/50 rounded-full"></div>
          <div className="flex justify-center items-center gap-2">
            <img src={movieIcon} alt="movie-icon" />
            <p>Movie</p>
          </div>
          <div className="w-[3px] h-[3px] bg-white/50 rounded-full"></div>
          <p>PG</p>
        </div>
        <div>
          <p className="text-bodyM smTab:text-lg">Beyond Earth</p>
        </div>
      </div>
    </div>
  );
};

export default ContentItem;
