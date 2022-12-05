import React from 'react'
import {Trending, Content} from "../components";
import { useSelector } from 'react-redux';

const Home = () => {
  const {allContentData} = useSelector(store => store.content)
  return (
    <>
      <Trending/>
      <Content name={"Recommended for you"} contentData={allContentData}/>
    </>
  )
}

export default Home