import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <nav className='flex items-center justify-evenly py-4 font-medium text-base'>
        <NavLink to={'/'}>جستجوی کاربر</NavLink>
        <NavLink to={'/popular-most'}>محبوبترین ریپازیتوری ها</NavLink>
    </nav>
  )
}

export default Header