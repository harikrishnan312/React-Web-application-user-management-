import React, { useEffect } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import useAuth from '../../hooks/useAuth';

function Header() {
  const {user} = useAuth()
  const users = useSelector((state)=>  state.user.userData )

  
  return (
    <div>
      <div className='header'>
        <span  style={{cursor:'pointer',fontWeight:'bolder'}}>{ user ? users.name : <Link to={'/login'}>Login</Link> } </span>
        <button className='button' >{ user ?  <Link to={('/profile')}> User Profile </Link> : ''}</button>

      </div>
      <div className='body'>
        Home
      </div>
    </div>
  )
}

export default Header
