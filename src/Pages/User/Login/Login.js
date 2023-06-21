import React, { useState } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

function Login() {
  const {setUser} = useAuth()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()
  async function userCheck(e) {
    e.preventDefault()
    const res = await fetch('http://localhost:8000/login', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    const data = await res.json()
    console.log(data);
    if (data.user===true) {
      setUser(data.user);
      localStorage.setItem('token', data.token)
      navigate('/')
    } else if (data.user === 'blocked') {
      setError('User Blocked')
    } else {
      setError('Wrong email or Password')
    }

  }
  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={userCheck}>
        <label htmlFor="username">Email:</label>
        <input type="email" id="username" name="username" value={email} onChange={(e) => {
          setEmail(e.target.value)
        }} required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => {
          setPassword(e.target.value)
        }} required />
        <button type="submit">Login</button>
        <br></br>
        <span onClick={() => {
          navigate('/signup');
        }} style={{ textAlign: 'center', cursor: 'pointer' }}>SignUp</span>
        <br></br>
        <span style={{color:'red',textAlign:'center'}}>{error}</span>

      </form>
    </div>
  )
}

export default Login
