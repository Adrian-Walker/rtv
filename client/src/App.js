import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Auth from "./components/Auth.js";
import Profile from "./components/Profile.js";
import Public from "./components/Public.js";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserContext } from "./context/UserProvider.js";

export default function App() {
  const { token, logout } = useContext(UserContext);
  console.log(token);
  return (
    <div className="app">
      <Router>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <ProtectedRoute route="/profile" negate={true}>
                <Auth />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute route="/">
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/public"
            element={
              <ProtectedRoute route="/">
                <Public />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

/*
import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar.js'
import Auth from './components/Auth.js'
import Profile from './components/Profile.js'
import Public from './components/Public.js'
import ProtectedRoute from './components/ProtectedRoute'
import { UserContext } from './context/UserProvider.js'

export default function App(){
  const { token, logout } = useContext(UserContext)
  return (
    <div className="app">
      { token && <Navbar logout={ logout }/>}
      <Switch>
        <Route
          exact path="/"
          render={()=> token ? <Redirect to="/profile"/> : <Auth />}
        />
        <ProtectedRoute
          path="/profile"
          component={Profile}
          redirectTo='/'
          token={token}
        />
        <ProtectedRoute
          path="/public"
          component={Public}
          redirectTo='/'
          token={token}
        />
      </Switch>
    </div>
  )
}
*/
