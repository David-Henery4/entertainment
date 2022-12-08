import React from "react";
import { useDispatch } from "react-redux";
import { bookmarkContent, updateTrending, updateContent } from "../features/content/contentSlice";
import { greatLandsThumbSml, bookmarkIcon, movieIcon, bookmarkIconFull } from "../assets";
import basicThumb from "../assets/thumbnails/unresolved-cases/regular/small.jpg"

const ContentItem = ({
  id,
  category,
  isBookmarked,
  rating,
  thumbnail,
  title,
  year,
}) => {
  const { regular } = thumbnail;
  const dispatch = useDispatch()
  // console.log(regular.small)
  return (
    <div className="grid gap-2 w-full">
      {/* IMAGE & BOOKMARK ICON */}
      <div className="relative w-full">
        {/* temp w&h for img */}
        <div className="grid place-items-center absolute z-10 top-2 right-2 w-8 h-8 rounded-full bg-darkBlue/50 hover:cursor-pointer" onClick={() => {
            // dispatch(bookmarkContent(id))
            // dispatch(updateTrending(id))
            dispatch(updateContent(id))
          }}>
          <img src={isBookmarked ? bookmarkIconFull : bookmarkIcon} alt="bookmark-icon" />
        </div>
        {/* h-[110px] */}
        <img
          className="w-full rounded-lg"
          src={regular && require(`../assets/thumbnails/${regular.small}`)}
          alt="thumbnail"
        />
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
