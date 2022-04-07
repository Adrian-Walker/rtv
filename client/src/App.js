import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.js'
import Auth from './components/Auth.js'
import Profile from './components/Profile.js'
import Public from './components/Public.js'
import ProtectedRoute from './components/ProtectedRoute.js'
import { UserContext } from './context/UserProvider.js'

function App() {
  const { token, logout } = useContext(UserContext)
  return (
    <div className="app">
      {token && <Navbar logout={logout} />}
      <h1>yes</h1>
      <Routes>
        <Route
          exact path="/"
          render={() => token ? <Navigate to="/profile" /> : <Auth />}
        />

        <ProtectedRoute
          path="/profile"
          component={Profile}
          redirectTo="/"
          token={token}
        />
        <ProtectedRoute
          path="/public"
          component={Public}
          redirectTo="/"
          token={token}
        />
      </Routes>
    </div>
  )
}

export default App
