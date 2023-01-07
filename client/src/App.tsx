import React,{useEffect,createContext,useReducer,useContext} from 'react';
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
import { initialState, IUserContext, reducer } from './reducer/userReducer';

export const UserContext = createContext<any>({})

const Routing = () => {
  const {state,dispatch} = useContext(UserContext)
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<Create />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <div className="App">
      <UserContext.Provider value={{state,dispatch}} >
        <Navbar />
        <Routing />
      </UserContext.Provider>
    </div>
  );  
}

export default App;
