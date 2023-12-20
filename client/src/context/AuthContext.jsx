import React, { useState,  createContext } from 'react';
// import {getUser} from "../services/apiService"


export const AuthContext = createContext();


const AuthProvider = ({ children }) => {

  // const [adminData,setAdminData] = useState({})
  
  // const id = localStorage.getItem("id")

    // const isLoggin = ()=>{
    //     return localStorage.getItem('token') ? true : false;
    // }

    // const getUserById = ()=>{
    //   console.log('daaa');
    //   getUser(id)
    // }

    // const getAdminSetState = (e)=> setAdminData(e) 

    const obj = {
      // isLoggin,
      // getAdminSetState,
      // getUserById,
      adminData:true,
    }


  return (
    <AuthContext.Provider value={obj}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthProvider;

