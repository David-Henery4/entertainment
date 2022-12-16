import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, SearchInput } from "../components";
import { getContent, initialFetch } from "../features/content/contentSlice";
import { useEffect } from "react";
import { LogInSignUp } from "../pages/LogInSignUp";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { bookmarkedContent, isLoading, userInfo } = useSelector(
    (store) => store.content
  );
  const location = useLocation();
  const anyBookmarks = bookmarkedContent.length;
  //
  useEffect(() => {
    dispatch(getContent());
    dispatch(initialFetch(userInfo))
  }, []);
  //
  return (
    <div className="App font-outfit font-light bg-darkBlue text-white">
      {/* <LogInSignUp/> */}
      <main
        className="relative content-start items-baseline pb-14 smTab:pt-6 w-full min-h-screen grid grid-cols-mobBleed gap-y-6 smTab:grid-cols-tabBleed smTab:gap-y-8 lg:grid-cols-deskBleed xl:grid-cols-lrgDeskBleed xl:grid-rows-lrgDeskRows"
        style={{
          gridTemplateRows:
            location.pathname === "/bookmarked" &&
            anyBookmarks <= 0 &&
            "max-content",
        }}
      >
        <Navbar />
        <SearchInput />
        <div className="grid grid-cols-mobBleed smTab:grid-cols-tabBleed lg:grid-cols-deskBleed col-start-1 col-end-13 gap-y-6 h-full content-start smTab:gap-y-8 xl:gap-y-9 xl:col-start-3 xl:col-end-lrgMainGridEnd xl:row-start-2 xl:row-end-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
