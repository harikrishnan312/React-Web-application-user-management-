import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';


function Header() {
  const {setAdmin} = useAuth()
  const users = useSelector((state)=>state.users.userList);
  return (
    <div>
      <div className='header'>
        {users ? '' :<button className='button'><Link to={('/admin-login')}>login</Link></button>}
      <br>
      </br>
      {users ? <button className='button' onClick={()=>{
        localStorage.clear()
        setAdmin('')
      }}><Link to={('/admin-login')}>Logout</Link></button>:''}
      </div>
    </div>
  )
}

export default Header
