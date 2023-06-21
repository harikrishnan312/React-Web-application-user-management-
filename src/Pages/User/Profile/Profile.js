import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './profile.css';
import { setUserData } from '../../../redux/userData';
import useAuth from '../../../hooks/useAuth';


function Profile() {
  const { setUser } = useAuth()
  // const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const [image, setImage] = useState('')
  const [images, setImageFile] = useState('')
  const token = localStorage.getItem('token');

  function HandleImage(e) {
    // setImage((URL.createObjectURL(e.target.files[0])))
    setImageFile(e.target.files[0])
    // console.log(images);
  }
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', images);
    formData.append('email', user.email)
    function callBack() {
      axios.post('http://localhost:8000/profile', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((res) => {
        if (res.data.status === 'ok') {
          setImage(res.data.image)
        }
        else {
          console.log('error');
        }
      })
    }
    callBack();
  }
  useEffect(() => {

    const token = localStorage.getItem('token');
    async function callBack() {

      axios.get('http://localhost:8000/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((res) => {
        if (res.data.user) {
          // console.log(res.data.userDetails.image);
          setImage(res.data.userDetails.image)
          dispatch(setUserData(res.data.userDetails))

        } else {
          console.log('unauthorised');
        }
      })

    }

    callBack()
  }, [dispatch,image])

  const user = useSelector((state) => state.user.userData);


  return (
    <div className="user-profile">
      <img className="avatar" src={image ? `http://localhost:8000/images/${image}` : process.env.PUBLIC_URL + '/images/phishing.png'} alt="no img" />
      <form onSubmit={handleFormSubmit} >
        <input type="file" onChange={(e) => HandleImage(e)} style={{ backgroundColor: '#4CAF50' }} />
        <button type="submit" style={{ backgroundColor: '#4CAF50' }}>Update</button>
      </form >
      <h2 className="username">{user.name}</h2>
      <div className="user-info">
        <div className="info-row">
          <span className="label">Email:</span>
          <span className="value">{user.email}</span>
        </div>
        <br></br>
      </div>
      <div>
        <button className='btn'  > <Link to={('/edit')}>Edit</Link> </button>
        <button className='btn' onClick={() => {
          localStorage.clear();
          setUser('')
        }}><Link to={('/login')}  >Logout</Link></button>
      </div>
      <br />
      <Link to={('/')}>back</Link>
    </div>

  )
}

export default Profile
