import React from 'react'

// import AppRouter from './routes/AppRouter'
// import { AuthContext } from './context/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Home from './views/Home';
import Myposts from './components/profile/myposts/Myposts';
import VideoCall from './components/profile/videocall/VideoCall';
import VideoChat from './components/profile/chatroom/ChatRoom';
import Otp from './components/profile/otp/otp';
import GoogleSignin from './components/auth/googleSignin/GoogleSignin';
import GroupChat from './components/profile/groupchat/GroupChat';




const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignIn/>}/>
      <Route path='/register' element={<SignUp/>}  />
     
      <Route path="/home" element={<Home />}/>
      <Route path='videoCall' element={<VideoCall/>} />
      <Route path='videochat' element={<VideoChat/>} />
      <Route path='groupchat' element={<GroupChat/>} />

      <Route path='/otp' element={<Otp/>} />
      <Route path='/googleSignin' element={<GoogleSignin/>} />

      


      
      <Route path="myposts" element={<Myposts />}/>

       
     
    </Routes>
  </BrowserRouter>

  )
}

export default App