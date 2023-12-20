import React, { useState, useEffect } from 'react';
import {  useNavigate, Navigate } from 'react-router-dom';
// import Header from '../components/common/Header'
import Display from '../Display';



const Home = () => {
  const [isLogged, setIsLogged] = useState(false);
  
  let navigate = useNavigate();

  const token =localStorage.getItem('token');
  const firstname = localStorage.getItem('firstname');
  const id = localStorage.getItem('id');


  const isLoggin = async () => {
    try {
   
      console.log(Boolean(token), Boolean(firstname), Boolean(id));
      if (token && firstname && id) {
        console.log('trueee');
        return setIsLogged(true);
      } else {
        console.log('falseee');
        return setIsLogged(false)
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  

  useEffect(()=>{
    isLoggin()
    navigate()
    // console.log(isLoggin(),'log');
  },[])


     
    
  return (
    <div>
      {/* <Header /> */}
      {/* <UserProfile /> */}
      {isLogged ? <Display/> : navigate("/") }
      {console.log(isLogged, 'isLogged')}
    </div>
  );
};

export default Home;