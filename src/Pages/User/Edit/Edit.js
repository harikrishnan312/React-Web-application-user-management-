
import { useEffect, useState } from 'react';
import './Edit.css'
import { useSelector } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';


 function Edit() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [newPass, setNewPass] = useState('');
    const [error, setError] = useState('');
    // const dispatch = useDispatch()

    const user =  useSelector((state => state.user.userData));
    const token = localStorage.getItem('token');

    // console.log(user._id);

    const navigate = useNavigate()

    async function updateUser(e) {
        e.preventDefault();
       const res =  await fetch('http://localhost:8000/edit',{
            method:'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-type': 'application/json'
              },
              body: JSON.stringify({
                userName,
                password,
                newPass,
                id:user._id
              })
        })
        const data = await res.json();
        // console.log(data.user);
        if(data.status==='Wrong password'){
            setError(data.status)
        }else if(data.status==='ok'){
            navigate('/profile')
        }
        

    }
    useEffect(()=>{
        setUserName(user.name)

    },[user.name])

    return (
        <div className="container">
            <h1>Edit</h1>
            <form onSubmit={updateUser}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={userName} onChange={(e) => {
                    setUserName(e.target.value)
                }} required />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => {
                    setPassword(e.target.value)
                }}  placeholder='Change password'/>
                <label htmlFor="password">New Password:</label>
                <input type="password" id="password" name="password" value={newPass} onChange={(e) => {
                    setNewPass(e.target.value)
                }} placeholder='New Password'/>
                <button type="submit">Update</button>
                <br></br>
                <span style={{ color: 'red', textAlign: 'center' }}>{error}</span>
            </form>
            <Link to={('/profile')}>back</Link>
        </div>
    )
}

export default Edit
