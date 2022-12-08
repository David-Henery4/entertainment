import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getMovies } from "../features/content/contentSlice";
import { Content, LoadingSpinner } from '../components'

const Movies = () => {
  const { moviesData, isLoading } = useSelector((store) => store.content);
  const dispatch = useDispatch()
  //
  useEffect(() => {
    dispatch(getMovies());
  }, [])
  //
  return <>
  {isLoading ? <LoadingSpinner/> : <Content name={"Movies"} contentData={moviesData}/>}
  </>
}

export default Movies