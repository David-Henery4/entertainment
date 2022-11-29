import React from 'react'
import navigationData from '../navigation/navData'
import { LogoIcon, profileImg } from '../assets'

const Navbar = () => {
  return (
    <nav className='bg-semiDarkBlue flex w-full p-4 justify-between items-center'>
      <div>
        <LogoIcon/>
      </div>
      <div>
        <ul className='flex gap-6'>
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
      <div className='w-6'>
        <img src={profileImg} alt="profile-avatar" />
      </div>
    </nav>
  )
}

export default Navbar