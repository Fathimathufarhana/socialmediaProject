import React from 'react'
import Header from "./components/common/Header"
import Footer from "./components/common/Footer"

import UserProfile from './components/profile/UserProfile'
import PostData from './components/profile/PostData';
import ViewPost from './components/profile/ViewPost';
import FriendList from './components/profile/FrienList';


// console.log(UserProfile.response,"iiiiiiiiiiiiii");
const Display = () => {

  //     const user = {
  //   name: 'John Doe',
  //   email: 'john.doe@example.com',
  //   avatar: 'https://example.com/avatar.jpg',
  //   posts: 25,
  //   followers: 150,
  //   following: 100,
  //   // Add other user information as needed
  // };



  return (
    <>

      <Header />
        <UserProfile />
      {/* <UserProfile data={user}/> */}
      <div >
        <PostData />
        <FriendList />

        {/* <ViewPost/> */}
      </div>
      {/* <Footer /> */}
    </>

  )
}

export default Display