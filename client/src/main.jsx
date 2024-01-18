import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './context/AuthContext.jsx';
// import io from 'socket.io-client';

// const socket = io('http://localhost:4002'); 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <App />
    </AuthProvider>
    <ToastContainer/>
  </React.StrictMode>,
)
