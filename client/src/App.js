import React, { useContext } from "react";
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js'
import Auth from './components/Auth.js'




function App() {
  const { token, logout } = useContext()
  return (
    <div className="App">
      {token && <Navbar logout={logout} />}
      <Routes>
        <Route
          exact path="/"
          render={() => token ? <Route to="/profile" /> : <Auth />}
        />
      </Routes>
      <h1>Hello</h1>
    </div>
  );
}

export default App;
