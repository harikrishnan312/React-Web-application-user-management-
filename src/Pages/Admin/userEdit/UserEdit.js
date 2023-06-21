import React, {  useState } from 'react';
import './UserEdit.css'
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { useSelector } from 'react-redux';

function UserEdit() {

    const navigate = useNavigate()
    const [userName, setUserName] = useState('');
    // const [email, setEmail] = useState('');
    const edit = useSelector((state) => state.edit.userEdit)

    var url_string = window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get("id");
    const token = localStorage.getItem('Admin-token');


    //   const [error, setError] = useState('');
    // console.log(edit);
    async function EditUser(e) {
        e.preventDefault();

        const res = await fetch('http://localhost:8000/admin-user', {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                userName,
                id
            })
        })
        const data = await res.json();
        if (data.status === 'ok') {
            navigate('/admin-home')
        }
        else {
            console.log('error');
        }

    }


    return (
        <div className="container">
            <h1>Edit</h1>
            <form onSubmit={EditUser}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={userName} placeholder={edit.name} onChange={(e) => {
                    setUserName(e.target.value)
                }} required />

                <button type="submit">Update</button>
                <br></br>
            </form>
        </div>
    )
}

export default UserEdit
