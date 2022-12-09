import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ContentItem } from "../components";

const Content = ({name, contentData}) => {
  const location = useLocation()
  const pageName = location.pathname
  // console.log(contentData)
  const noDataPageConditionMsg = () => {
  if (pageName === "/bookmarked"){
    return "You have no bookmarked items."
  }
  if (pageName === "/"){
    return "No content available at the momment, please try again"
  }
  if (pageName === "/movies"){
    return "No movies available at the momment, please try again";
  }
  if (pageName === "/tv"){
    return "No tv shows available at the momment, please try again";
  }
  }
  //
  useEffect(() => {
    if (!contentData){
      noDataPageConditionMsg()
    }
  },[pageName])
  //
  return (
    <section className="col-start-2 col-end-12 grid gap-6 smTab:gap-8">
      <h2 className="text-xl font-light smTab:text-subheadingTab">{name}</h2>
      {/* item container */}
      <div className="grid grid-cols-contentRespon gap-4 smTab:gap-x-contentTabColGap smTab:gap-y-contentTabRowGap smTab:grid-cols-contentResponTab lg:gap-x-contentLapColGap lg:gap-y-contentLapRowGap lg:grid-cols-contentResponDesk">
        {contentData && contentData.map((item) => {
          return <ContentItem key={item.id} {...item}/>;
        })}
      </div>
    </section>
  );
};

export default Content;
