import React from 'react'
import {ContentItem} from "../components"

const Content = () => {
  return (
    <section className="col-start-2 col-end-12 grid gap-6 xl:col-start-4 xl:col-end-lrgMainGridBeforeEnd">
      <h2 className="text-xl font-light smTab:text-subheadingTab">
        Recommended for you
      </h2>
      {/* item container */}
      <div className="grid grid-cols-contentRespon gap-4 smTab:gap-x-contentTabColGap smTab:gap-y-contentTabRowGap smTab:grid-cols-contentResponTab lg:gap-x-contentLapColGap lg:gap-y-contentLapRowGap lg:grid-cols-contentResponDesk">
        <ContentItem />
        <ContentItem />
        <ContentItem />
        <ContentItem />
        <ContentItem />
      </div>
    </section>
  );
}

export default Content