import React from 'react'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import ProtectedRoutes from './routes/ProtectedRoutes'
import ForgotPasswordModal from './components/ForgotPasswordModal'
import ResetPassword from './pages/ResetPassword'

const App = () => {
  return (
   <Routes>
    {/* Public Routes */}
    <Route path='/' element={<Signup/>}/>
    <Route path="/signup" element={<Signup />} />
    <Route path='/login' element={<Login/>}/>
    <Route path="/forgot-password" element={<ForgotPasswordModal />} />
    <Route path="/reset-password/:token" element={<ResetPassword />} />


    {/* Protected Routes */}
     <Route path='/dashboard' element={ <ProtectedRoutes> <Home/> <ProtectedRoutes/></ProtectedRoutes>}/>
      <Route path="/profile" element={<ProtectedRoutes> <Profile /> </ProtectedRoutes>} />

   </Routes>
  )
}

export default App
