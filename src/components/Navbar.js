import React from 'react'
import { NavLink } from 'react-router-dom'
import navigationData from '../navigation/navData'
import { LogoIcon, profileImg } from '../assets'
import {Signout} from "../components"
import { useState } from 'react'

const Navbar = () => {
  const [signoutActive,setIsSignoutActive] = useState(false)
  //
  const signoutActiveStyles = () => {
    return signoutActive
      ? "absolute transition-all rounded bg-greyishBlue p-2 hover:cursor-pointer top-10 -left-16 scale-1 xl:-left-4"
      : "absolute transition-all rounded  bg-greyishBlue p-2 hover:cursor-pointer  top-0 -left-6 scale-0";
  }
  //
  const navLinksStyles = (isActive) => {
    return isActive
      ? "fill-white hover:fill-red"
      : "fill-greyishBlue hover:fill-red";
  }
  //
  return (
    <nav className='smTab:rounded-lg col-start-1 col-end-13 bg-semiDarkBlue flex w-full p-4 justify-between items-center smTab:col-start-2 smTab:col-end-12 smTab:p-5 xl:col-start-2 xl:col-end-3 xl:flex-col xl:gap-19 xl:row-start-1 xl:row-end-4 xl:h-verticalNavbar'>
      <div>
        <LogoIcon/>
      </div>
      <div className='xl:mb-auto'>
        <ul className='flex gap-6 xl:flex-col smTab:gap-8 lg:gap-10'>
        {navigationData.map(navItem => {
          const { id, name, path} = navItem
          return (
            <NavLink key={id} to={path} aria-label={name} className={({isActive}) => navLinksStyles(isActive)}>
              <navItem.icon/>
            </NavLink>
          )
        })}
        </ul>
      </div>
      <div className='w-6 smTab:w-8 relative hover:cursor-pointer hover:scale-110' onClick={() => setIsSignoutActive(!signoutActive) }>
        <img src={profileImg} alt="profile-avatar" />
        <Signout signoutActiveStyles={signoutActiveStyles}/>
      </div>
    </nav>
  )
}

export default Navbar