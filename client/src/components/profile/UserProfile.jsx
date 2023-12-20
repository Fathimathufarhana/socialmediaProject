import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { getUserById } from '../../service/apiService';

const UserProfile = () => {

  const [userData, setUserData] = useState({});
  // console.log(userData,"userdata in userProfile");
  // console.log(userData.profilePicture,"profilepictureee");

  const fetchData = async () => {
    try {
      const response = await getUserById();
      setUserData(response);
      console.log(response, 'response');
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Handle error, show an error message, etc.
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFollowClick = () => {
    // Add logic for handling follow action
    console.log(`User ${userData.firstname} followed`);
  };

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
    {/* <h1>hhhhhhhhhhh</h1> */}
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
                5
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Posts
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                555
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Followers
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                55
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Following
              </Typography>
            </Grid>
          </Grid>

          <Grid mt={2} style={{ gap: '2.25rem', display: 'flex' }}>
            <Grid item xs={6}>
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

            <Grid item xs={6}>
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
          </Grid>
        </Grid>
      </Grid>

      {/* Right Side: Main Content */}
      {/* <PostData/> */}

      {/* ... (your existing content) */}
      {/* <FriendList/> */}
    </Grid>
    </>
  );
};

export default UserProfile;
