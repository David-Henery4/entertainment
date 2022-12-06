import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getMovies } from "../features/content/contentSlice";
import { Content } from '../components'

const Movies = () => {
  const { moviesData } = useSelector((store) => store.content);
  const dispatch = useDispatch()
  //
  useEffect(() => {
    dispatch(getMovies());
  }, [])
  //
  return <Content name={"Movies"} contentData={moviesData}/>;
}

export default Movies