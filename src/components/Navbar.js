import React from 'react'
import navigationData from '../navigation/navData'
import { LogoIcon, profileImg } from '../assets'

const Navbar = () => {
  return (
    <nav className='smTab:rounded-lg col-start-1 col-end-13 bg-semiDarkBlue flex w-full p-4 justify-between items-center smTab:col-start-2 smTab:col-end-12 smTab:p-5 xl:col-start-2 xl:col-end-3 xl:flex-col xl:row-start-1 xl:row-end-4'>
      <div>
        <LogoIcon/>
      </div>
      <div>
        <ul className='flex gap-6 xl:flex-col'>
        {navigationData.map(navItem => {
          const {active, id, name, path} = navItem
          return (
            <a key={id} href={path} aria-label={name}>
              <navItem.icon/>
            </a>
          )
        })}
        </ul>
      </div>
      <div className='w-6 smTab:w-8'>
        <img src={profileImg} alt="profile-avatar" />
      </div>
    </nav>
  )
}

export default Navbar