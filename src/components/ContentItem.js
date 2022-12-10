import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  bookmarkContent,
  updateTrending,
  updateContent,
  updateMovies,
  updateTvSeries,
} from "../features/content/contentSlice";
import { movieIcon, BookmarkIconEmpty, BookmarkIconFull, playIcon } from "../assets";


const ContentItem = ({
  id,
  category,
  isBookmarked,
  rating,
  thumbnail,
  title,
  year,
}) => {
  //
  const dispatch = useDispatch();
  const { regular } = thumbnail;
  //
  return (
    <div className="grid gap-2 w-full">
      {/* IMAGE & BOOKMARK ICON */}
      <div className="group/play relative w-full hover:cursor-pointer">
        {/* HOVER STATE */}
        <div className="grid place-items-center group-hover/play:opacity-100 opacity-0 absolute top-0 left-0 w-full h-full bg-darkBlue/50">
          <div className="flex gap-5 items-center bg-white/25 p-[3%] pr-[10%] rounded-full">
            <img src={playIcon} alt="play-icon" />
            <p className="text-lg font-medium">Play</p>
          </div>
        </div>
        {/* NON-HOVER STATE */}
        <div
          className="group/mark grid place-items-center absolute z-10 top-2 right-2 w-8 h-8 rounded-full bg-darkBlue/50 hover:cursor-pointer hover:bg-white"
          onClick={() => {
            dispatch(bookmarkContent(id));
            dispatch(updateMovies(id));
            dispatch(updateTvSeries(id));
            dispatch(updateTrending(id));
            dispatch(updateContent(id));
          }}
        >
          {isBookmarked ? (
            <BookmarkIconFull className="fill-white group-hover/mark:fill-darkBlue" />
          ) : (
            <BookmarkIconEmpty className="stroke-white group-hover/mark:stroke-darkBlue" />
          )}
        </div>
        <picture>
          <source
            srcSet={regular && require(`../assets/thumbnails/${regular.medium}`)}
            media="(min-width:45.62em)"
          />
          <img
            className="w-full rounded-lg"
            srcSet={regular && require(`../assets/thumbnails/${regular.small}`)}
            alt="thumbnail"
          />
        </picture>
      </div>
      {/* TEXT INFO */}
      <div className="z-10 relative flex flex-col justify-center items-start">
        <div className="flex justify-center items-center gap-2 text-xs smTab:text-bodySml text-white/75">
          <p>{year}</p>
          <div className="w-[3px] h-[3px] bg-white/50 rounded-full"></div>
          <div className="flex justify-center items-center gap-2">
            <img src={movieIcon} alt="movie-icon" />
            <p>{category}</p>
          </div>
          <div className="w-[3px] h-[3px] bg-white/50 rounded-full"></div>
          <p>{rating}</p>
        </div>
        <div>
          <p className="text-bodyM smTab:text-lg">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default ContentItem;
