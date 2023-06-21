import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css'
import useAuth from '../../../hooks/useAuth';


function AdminLogin() {
    const {setAdmin} = useAuth()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState('')
    const navigate = useNavigate()

    async function AdminCheck(e){
        e.preventDefault()
        const res = await fetch('http://localhost:8000/admin-login', {
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
        // console.log(data);
        if (data.admin) {
            setAdmin(data.admin)
            localStorage.setItem('Admin-token', data.admin)
            navigate('/admin-home')
        }else{
            setError('Wrong credentials')
        }
    }
        return (
            <div className='container'>
                <h1>Admin Login</h1>
                <form onSubmit={AdminCheck}>
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
                    <br></br>
                    <span style={{color:'red',textAlign:'center'}}>{error}</span>

                </form>
            </div>
        )
    
}

export default AdminLogin
