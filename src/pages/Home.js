import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {Trending, Content} from "../components";

const Home = () => {
  const { allContentData, trendingContent } = useSelector(
    (store) => store.content
  );
  return (
    <>
      <Trending trendingData={trendingContent}/>
      <Content name={"Recommended for you"} contentData={allContentData}/>
    </>
  )
}

export default Home