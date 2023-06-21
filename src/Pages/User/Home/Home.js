import React, { useEffect } from 'react'
import Header from '../../../Components/Header/Header'
import axios from 'axios';
import {  useDispatch } from 'react-redux';
import { setUserData } from '../../../redux/userData';




function Home() {

  const dispatch = useDispatch();
  useEffect(() => {

    const token = localStorage.getItem('token');
    async function callBack() {

      axios.get('http://localhost:8000/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((res) => {
        if (res.data.user) {
          dispatch(setUserData(res.data))
        }else{
          console.log('unauthorised');
        }
      })

    }

    callBack()
  },[dispatch])
  // const user = useSelector((state) =>  state.user.userData )
  // console.log(user);
  return (
    <div>
      <Header></Header>
    </div>
  )
}

export default Home
