import React from 'react'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import ProtectedRoutes from './routes/ProtectedRoute'

const App = () => {
  return (
   <Routes>

    <Route path='/' element={<Signup/>}/>
    <Route path="/signup" element={<Signup />} />
    <Route path='/login' element={<Login/>}/>
     {/* Protected Routes */}
     <Route path='/dashboard' element={ <ProtectedRoutes> <Home/> <ProtectedRoutes/></ProtectedRoutes>}/>
     <Route path="/profile" element={<ProtectedRoutes> <Profile /> </ProtectedRoutes>} />

   </Routes>
  )
}

export default App
