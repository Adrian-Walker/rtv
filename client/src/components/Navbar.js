import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from "../context/UserProvider.js";


export default function Navbar(props){
  const { token, logout } = useContext(UserContext);
  // const { logout } = props
  return (
    <div className="navbar">
      <Link style={{fontWeight: "bold"}} to="/profile">Profile</Link>
      <Link style={{fontWeight: "bold"}} to="/public">Public</Link>
      <button style={{fontWeight: "bold"}} onClick={logout}>Logout</button>
    </div>
  )
}
