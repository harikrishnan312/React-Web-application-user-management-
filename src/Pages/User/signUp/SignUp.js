import React, { useState } from 'react';
import './signUp.css'
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  async function registerUser(e) {
    e.preventDefault()
    const res = await fetch('http://localhost:8000/signUp', {
      method:'post',
      headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify({
        userName,
        email,
        password
      })
    })

    const data = await res.json();
    if(data.status==='ok'){
navigate('/login')
    }else{
      setError(data.error)
    }
    console.log(data);
  }

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={registerUser}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={userName} onChange={(e) => {
          setUserName(e.target.value)
        }} required />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => {
          setEmail(e.target.value)
        }} required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => {
          setPassword(e.target.value)
        }} required />
        <button type="submit">Sign Up</button>
        <br></br>
        <span onClick={() => {
          navigate('/login');
        }} style={{ textAlign: 'center', cursor: 'pointer' }}>Login</span>
        <br></br>
        <span style={{color:'red',textAlign:'center'}}>{error}</span>
      </form>
    </div>
  )
}

export default SignUp
