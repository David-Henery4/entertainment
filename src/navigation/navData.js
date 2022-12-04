import {NavBookmarkIcon, NavHomeIcon, NavMoviesIcon, NavTvSeriesIcon} from "../assets"

const navigationData = [
  {
    id: 1,
    name: "Home",
    active: false,
    icon: NavHomeIcon,
    path: "/",
  },
  {
    id: 2,
    name: "Movies",
    active: false,
    icon: NavMoviesIcon,
    path: "movies",
  },
  {
    id: 3,
    name: "Tv-Series",
    active: false,
    icon: NavTvSeriesIcon,
    path: "tv",
  },
  {
    id: 4,
    name: "Bookmarks",
    active: false,
    icon: NavBookmarkIcon,
    path: "bookmarked",
  },
];

export default navigationData