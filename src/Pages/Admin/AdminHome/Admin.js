import React, { useEffect } from 'react';
import Header from '../../../Components/AdminHeader/Header'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUserList } from '../../../redux/userList';
import { setUserEdit } from '../../../redux/userEdit';
import './Admin.css'
import { Link, useNavigate } from 'react-router-dom';

function Admin() {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const token = localStorage.getItem('Admin-token');

    function HandleUser(obj) {
        navigate(`/admin-user?id=${obj._id}`)
        dispatch(setUserEdit(obj))
    }
    async function BlockUser(obj) {
        const res = await fetch('http://localhost:8000/admin-home', {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: obj._id,
                status: 'unblocked'
            })
        })
        const data = await res.json()
        if (data.status === 'ok') {
            alert('User Blocked')
            dispatch(setUserList(data.users))
            // setStatus('Blocked')
        }
    }
    async function UnBlockUser(obj) {
        const res = await fetch('http://localhost:8000/admin-home', {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: obj._id,
                status: 'blocked'

            })
        })
        const data = await res.json()
        if (data.status === 'ok') {
            alert('User unblocked')
            dispatch(setUserList(data.users))
            // setStatus('Unblocked')
        }
    }


    useEffect(() => {

        async function callBack() {

            axios.get('http://localhost:8000/admin-home', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                if (res.data.admin) {
                    dispatch(setUserList(res.data.users))
                    // console.log(res.data.users);

                } else {
                    console.log('unauthorised');
                }
            })

        }

        callBack()
    }, [dispatch,token])
    const users = useSelector((state) => state.users.userList)
    // console.log(users);


    return (
        <div>
            <Header></Header>
            <br></br>
            <h1>Admin Home</h1>
            <div className='tables'>
                <table>
                    {users ? users.map((obj, index) => {

                        return (
                            <tbody key={index}>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{obj.name}</td>
                                    <td>{obj.email}</td>
                                    <td><button onClick={() => { HandleUser(obj) }}>Edit</button></td>
                                    <td><button style={{ backgroundColor: 'red' }} onClick={() => { BlockUser(obj) }}>Block</button><br></br><br></br> <button onClick={() => { UnBlockUser(obj) }} style={{ backgroundColor: 'green' }}>UnBlock</button></td>
                                    <td>{obj.isBlocked ? 'blocked' : 'unblocked'}</td>
                                </tr>
                            </tbody>

                        )
                    }) : []}
                </table>

                <br></br>
                <button style={{ backgroundColor: '#009900', marginLeft: '200px' }}><Link to={('/admin-createuser')}>Create User</Link></button>
            </div>


        </div>
    )
}

export default Admin
