import React from "react";
import { useDispatch } from "react-redux";
import {
  bookmarkContent,
  updateTrending,
  updateContent,
  updateMovies,
  updateTvSeries,
} from "../features/content/contentSlice";
import {
  beyondEarthTrending,
  bookmarkIcon,
  movieIcon,
  bookmarkIconFull,
} from "../assets";

const Trending = ({ trendingData }) => {
  const dispatch = useDispatch();
  return (
    <section className="col-start-2 col-end-13 grid gap-4 smTab:gap-7 overflow-x-auto">
      <h1 className="text-xl font-light smTab:text-subheadingTab">Trending</h1>
      <div className="flex justify-start items-center gap-4 smTab:gap-10">
        {trendingData.map((trending) => {
          const { year, title, rating, category, id, isBookmarked, thumbnail } =
            trending;
          return (
            <div
              key={id}
              className="rounded-lg overflow-hidden relative w-60 h-36 p-4 flex justify-start items-end smTab:w-trendingThumbTab smTab:h-trendingThumbTab"
            >
              <div
                className="grid place-items-center absolute z-10 top-2 right-2 w-8 h-8 rounded-full bg-darkBlue/50 hover:cursor-pointer"
                onClick={() => {
                  dispatch(bookmarkContent(id));
                  dispatch(updateMovies(id));
                  dispatch(updateTvSeries(id));
                  dispatch(updateTrending(id));
                  dispatch(updateContent(id));
                }}
              >
                <img
                  src={isBookmarked ? bookmarkIconFull : bookmarkIcon}
                  alt="bookmark-icon"
                />
              </div>
              <img
                className="absolute top-0 left-0 -z-0 w-full h-full"
                src={
                  thumbnail.trending &&
                  require(`../assets/thumbnails/${thumbnail.trending.large}`)
                }
                // src={beyondEarthTrending}
                alt="beyond-earth-trending-thumbnail"
              />
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
