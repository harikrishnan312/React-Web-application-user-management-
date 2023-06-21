import React, { useState } from 'react';
import './CreateUser.css'
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('Admin-token');

  async function registerUser(e) {
    e.preventDefault()
    const res = await fetch('http://localhost:8000/admin-createuser', {
      method:'post',
      headers:{
        'Authorization': 'Bearer ' + token,
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
navigate('/admin-home')
    }else{
      setError(data.error)
    }
    console.log(data);
  }

  return (
    <div className="container">
      <h1>Create User</h1>
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
        <button type="submit">Create</button>
        <br></br>
        <span onClick={() => {
          navigate('/admin-home');
        }} style={{ textAlign: 'center', cursor: 'pointer' }}>Back</span>
        <br></br>
        <span style={{color:'red',textAlign:'center'}}>{error}</span>
      </form>
    </div>
  )
}

export default CreateUser
