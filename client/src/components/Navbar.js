import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props){
  const { logout } = props
  return (
    <div className="navbar">
      <Link style={{fontWeight: "bold"}} to="/profile">Profile</Link>
      <Link style={{fontWeight: "bold"}} to="/public">Public</Link>
      <button style={{fontWeight: "bold"}} onClick={logout}>Logout</button>
    </div>
  )
}
