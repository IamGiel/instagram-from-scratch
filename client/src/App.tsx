import React,{createContext,useContext,useEffect,useReducer} from 'react';
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
import { initialState, reducer } from './reducer/userReducer';
import { PleaseLogin } from './screens/error-states/unauthorized/pleaseLogin';
import { ProtectedRoute } from './Utils/protectedRoutes';

export const UserContext = createContext<any>({})


const Routing = () => {
  const {state,dispatch} = useContext(UserContext)
  useEffect(() => {
    localStorage.setItem('isLogin', 'false')
    console.log('STATE in ROUTES ', state)
  }, [])

  
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blog" element={<Blog />} />

        {/* need to protect this routes */}
        <Route path="/profile" element={<Profile />} />
        <Route path={"/create"} element={<Create />} />
        
        {/* fallback route */}
        <Route path="/loginrequired" element={<PleaseLogin />} />
        <Route path="/test" element={<ProtectedRoute ><p>Test here </p><p>hello</p></ProtectedRoute>} />
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
