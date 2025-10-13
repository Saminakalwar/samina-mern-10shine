import React from 'react'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'

const App = () => {
  return (
   <Routes>
    <Route path='/' element={<Signup/>}/>
    <Route path="/signup" element={<Signup />} />
    <Route path='/login' element={<Login/>}/>
     <Route path='/dashboard' element={<Home/>}/>
     <Route path="/profile" element={<Profile />} />

   </Routes>
  )
}

export default App
