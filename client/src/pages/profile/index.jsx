import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const user= useSelector((state) => state.user.userInfo);
  return (
    <div>
      <h1 >{user.email}</h1>
    </div>
  )
}

export default Profile
