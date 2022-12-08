import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTV } from "../features/content/contentSlice";
import { Content, LoadingSpinner } from "../components";

const TvSeries = () => {
  const dispatch = useDispatch();
  const { tvSeriesData, isLoading } = useSelector((store) => store.content);
  //
  useEffect(() => {
    dispatch(getTV());
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Content name={"TV-Series"} contentData={tvSeriesData} />
      )}
    </>
  );
};

export default TvSeries;
