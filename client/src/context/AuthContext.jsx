import React, { useState,  createContext } from 'react';
// import {getUser} from "../services/apiService"


export const AuthContext = createContext();


const AuthProvider = ({ children }) => {

  const [refresh,setRefresh] = useState(true)
  const [selectedPost, setSelectedPost] = useState(null)
  
  // const id = localStorage.getItem("id")

    const refreshUseEffectMethod = ()=>{
      setRefresh(!refresh)
    }

    const ProfileView = (post) => {
      setSelectedPost(post);
      console.log(post,'postsee');
    };

    // const getUserById = ()=>{
    //   console.log('daaa');
    //   getUser(id)
    // }

    // const getAdminSetState = (e)=> setAdminData(e) 

    const obj = {
      // isLoggin,
      // getAdminSetState,
      // getUserById,
      refreshUseEffectMethod,
      refresh,
      adminData:true,
    }


  return (
    <AuthContext.Provider value={{obj,selectedPost,ProfileView}}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthProvider;

