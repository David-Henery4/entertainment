import React from "react";
import { useDispatch } from "react-redux";
import {
  bookmarkContent,
  updateTrending,
  updateContent,
  updateMovies,
  updateTvSeries,
  updateUserBookmarks
} from "../features/content/contentSlice";
import {
  BookmarkIconEmpty,
  BookmarkIconFull,
  movieIcon,
  playIcon
} from "../assets";

const Trending = ({ trendingData }) => {
  const dispatch = useDispatch();
  return (
    <section className="col-start-2 col-end-13 grid gap-4 smTab:gap-7 overflow-x-auto style-scroll pb-2">
      <h1 className="text-xl font-light smTab:text-subheadingTab">Trending</h1>
      <div className="flex justify-start items-center gap-4 smTab:gap-10">
        {trendingData.map((trending) => {
          const { year, title, rating, category, id, isBookmarked, thumbnail } =
            trending;
          return (
            <div
              key={id}
              className="group/play hover:cursor-pointer rounded-lg overflow-hidden relative w-60 h-36 p-4 flex justify-start items-end smTab:w-trendingThumbTab smTab:h-trendingThumbTab"
            >
              {/* HOVER STATE */}
              <div className="group-hover/play:opacity-100 opacity-0 absolute top-0 left-0 w-full h-full bg-darkBlue/50 z-10 grid place-items-center">
                <div className="flex gap-5 items-center bg-white/25 p-[3%] pr-[10%] rounded-full">
                  <img src={playIcon} alt="play-icon" />
                  <p className="text-lg font-medium">Play</p>
                </div>
              </div>
              {/* IMG & ICON */}
              <div
                className="group/mark grid place-items-center absolute z-10 top-2 right-2 w-8 h-8 rounded-full bg-darkBlue/50 hover:cursor-pointer hover:bg-white"
                onClick={() => {
                  dispatch(bookmarkContent(id));
                  dispatch(updateMovies(id));
                  dispatch(updateTvSeries(id));
                  dispatch(updateTrending(id));
                  // dispatch(updateContent(id));
                  dispatch(updateUserBookmarks(id))
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
                  srcSet={
                    thumbnail.trending &&
                    require(`../assets/thumbnails/${thumbnail.trending.large}`)
                  }
                  media="(min-width:45.62em)"
                />
                <img
                  className="absolute top-0 left-0 -z-0 w-full h-full"
                  srcSet={
                    thumbnail.trending &&
                    require(`../assets/thumbnails/${thumbnail.trending.small}`)
                  }
                  // src={beyondEarthTrending}
                  alt="beyond-earth-trending-thumbnail"
                />
              </picture>
              {/* TEXT */}
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
        })}
      </div>
    </section>
  );
};

export default Trending;
