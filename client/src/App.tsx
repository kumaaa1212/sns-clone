import React, { useContext } from 'react';
import './App.css';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from './pages/state/AuthContext';

function App() {
  const {user} = useContext(AuthContext);
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home/> : <Register/>}/>
        <Route path="/login" element={user ? <Navigate to='/'/> : <Login/> }/>
        <Route path="/register" element={user ? <Navigate to='/'/>:<Register/> }/>
        <Route path="/profile/:username" element={<Profile/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;



// :usernameの所はパラメータと言われている。
// react-route-domで取得できる。useparems