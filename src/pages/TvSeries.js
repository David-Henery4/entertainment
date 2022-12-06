import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTV } from '../features/content/contentSlice';
import { Content } from "../components";

const TvSeries = () => {
  const dispatch = useDispatch()
  const { tvSeriesData } = useSelector((store) => store.content);
  //
  useEffect(() => {
    dispatch(getTV())
  }, [])
  return <Content name={"TV-Series"} contentData={tvSeriesData}/>;
}

export default TvSeries