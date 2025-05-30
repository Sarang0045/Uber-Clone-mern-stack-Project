import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/home'
import UserLogin from './Pages/userLogin'
import UserSignup from './Pages/userSignUp'
import Captainlogin from './Pages/captionLogin';
import CaptainSignup from './Pages/captainSignUp'

const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<Captainlogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
      </Routes>
    </div>
  )
}

export default App