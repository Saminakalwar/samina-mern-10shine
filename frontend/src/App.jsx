import React from 'react'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
   <Routes>
    <Route path='/' element={<Signup/>}/>
    <Route path="/signup" element={<Signup />} />
    <Route path='/login' element={<Login/>}/>
    <Route path='/Dashboard' element={<Dashboard/>}/>
   </Routes>
  )
}

export default App
