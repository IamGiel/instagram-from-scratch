import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {Route, Routes} from 'react-router-dom'
import { Navbar } from './navbar/navbar';
import { Home } from './screens/home/home';
import { Login } from './screens/login/login';
import { Create } from './screens/create/create';
import { Blog } from './screens/blog/blog';
import { Profile } from './screens/profile/profile';
import { Signup } from './screens/signup/signup';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<Create />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </div>
  );  
}

export default App;
