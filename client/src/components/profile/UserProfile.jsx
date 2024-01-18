import React, { useContext, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { getUserById } from '../../service/apiService';
import FriendList from './FrienList';
import { AuthContext } from '../../context/AuthContext';
// import VideoCall from './VideoCall';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
  
  const {refresh} = useContext(AuthContext)
  const { selectedPost } = useContext(AuthContext);


  const [datas,setDatas]=useState([])
  console.log(datas,"datas");
  const [userData, setUserData] = useState({});
  console.log(userData,"userdata in userProfile");
  // console.log(userData.followers.length,"userData.followers.lenght");
  // console.log(userData.profilePicture,"profilepictureee");

  const fetchData = async () => {
    let response;
    // console.log(response,'kkkkkkkkkkkkkkkkkkkkkkkk');
    if (selectedPost) {
      response = selectedPost;
      console.log(response,'selectedpost');
    } else {
    try {
       response = await getUserById();
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  setUserData(response);
  console.log(response, 'response');
};


const getPost=async(req,res)=>{
  try {
    let response=await axios.get(`http://localhost:4002/posts/myposts/${localStorage.getItem("id")}`)
    console.log(response,"res");
    setDatas(response.data)
    
  } catch (error) {
    console.log(error.message);
    
  }
}

// console.log(getPost,"getpost");
  useEffect(() => {
    fetchData();
    getPost()
  }, [refresh, selectedPost]);

  const handleFollowClick = () => {
    // Add logic for handling follow action
    console.log(`User ${userData.firstname} followed`);
  };

  const handleVideoClick = () => {
    // window.open(userData.videoLink, '_blank')
    // alert("Comming Soon")
    // <VideoCall/>

  }

  const handleMessageClick = () => {
    // Add logic for handling message action
    console.log(`Message sent to ${userData.firstname}`);
  };

  if (!userData.firstname) {
    // Loading state or handle error
    return <div style={{ color: 'red' }}>Loading...</div>;
  }

  return (

    <>
    <div className=''>
    {/* <h1>hhhhhhhhhhh</h1> */}
    <div>
    <Grid container
     style={{ marginTop: '5.5rem',maxWidth:"94rem" }}
    //  style={{ marginTop: '10rem' }}

    >
      {/* Left Side: User Profile */}
      <Grid item xs={12} md={3} lg={4} xl={3} sx={{ backgroundColor: '#f0f0f0', p: 4 }}>
        <Grid container direction="column" alignItems="center">
        {/* <Avatar src={userData.profilePicture} alt={userData.profilePicture} sx={{ width: 80, height: 80, mb: 2 }} /> */}

        <Avatar
            alt={userData.firstname}
            src={`http://localhost:4002/uploads/${userData.profilePicture}`}
            sx={{ width: 80, height: 80, mb: 2 }}
          />

          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {userData.firstname} {userData.lastname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userData.email}
          </Typography>

          <Grid container mt={4}>
            <Grid item xs={4}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {datas?.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Posts
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                98
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Followers
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {userData.followers.length}

              </Typography>
              <Typography variant="body2" color="text.secondary">
                Following
              </Typography>
            </Grid>
          </Grid>

          <Grid mt={2} style={{ gap: '2.25rem', display: 'flex' }}>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleFollowClick}
                fullWidth
              >
                Follow
              </Button>
            </Grid>

            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleMessageClick}
                fullWidth
              >
                Message
              </Button>
            </Grid>

            <Grid item xs={4}>
              {/* <Link to={'videoCall'}> */}
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleVideoClick}
                fullWidth
                component={Link} to="/videoCall"
              >
               videocall
              </Button>
              {/* </Link> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Right Side: Main Content */}
      {/* <PostData/> */}

      {/* ... (your existing content) */}
      {/* <h1>jjjjjjjjjjjjjjjjjjjjjjjjjj</h1> */}
    </Grid>
    </div>



    <div>
      <FriendList followers={userData.followers}/>
    </div>
    </div>
    </>
  );
};

export default UserProfile;
