import React from "react";
import { greatLandsThumbSml, bookmarkIcon, movieIcon } from "../assets";

const ContentItem = () => {
  return (
    <div className="grid gap-2">
      {/* IMAGE & BOOKMARK ICON */}
      <div className="relative w-[164px]">
        {/* temp w&h for img */}
        <div className="grid place-items-center absolute z-10 top-2 right-2 w-8 h-8 rounded-full bg-darkBlue/50">
          <img src={bookmarkIcon} alt="bookmark-icon" />
        </div>
        <img className="h-[110px] rounded-lg" src={greatLandsThumbSml} alt="thumbnail" />
      </div>
      {/* TEXT INFO */}
      <div className="z-10 relative flex flex-col justify-center items-start">
        <div className="flex justify-center items-center gap-2 text-xs text-white/75">
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
          <p className="text-bodyM">Beyond Earth</p>
        </div>
      </div>
    </div>
  );
};

export default ContentItem;
