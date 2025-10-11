import React from 'react'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

const App = () => {
  return (
   <Routes>
    <Route path='/' element={<Signup/>}/>
    <Route path="/signup" element={<Signup />} />
    <Route path='/login' element={<Login/>}/>
     <Route path='/dashboard' element={<Home/>}/>
   </Routes>
  )
}

export default App
