import React from 'react'
import {ContentItem} from "../components"

const Content = () => {
  return (
    <section className='col-start-2 col-end-12 grid gap-6'>
      <h2 className='text-xl font-light'>Recommended for you</h2>
      {/* item container */}
      <div className='grid grid-cols-contentRespon gap-4'>
        <ContentItem/>
        <ContentItem/>
      </div>
    </section>
  );
}

export default Content