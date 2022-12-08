import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getContent } from "../features/content/contentSlice";
import { Trending, Content, LoadingSpinner } from "../components";

const Home = () => {
  const dispatch = useDispatch();
  const { allContentData, trendingContent, isLoading } = useSelector(
    (store) => store.content
  );
  useEffect(() => {
    dispatch(getContent());
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Trending trendingData={trendingContent} />
          <Content name={"Recommended for you"} contentData={allContentData} />
        </>
      )}
    </>
  );
};

export default Home;
