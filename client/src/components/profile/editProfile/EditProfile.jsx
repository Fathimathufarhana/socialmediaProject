import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { getUserById } from '../../../service/apiService';
import axios from 'axios';

const EditProfile = () => {
  // const [formData, setFormData] = useState({
  //   firstname: '',
  //   lastname: '',
  //   email: '',
  //   password: '',
  // });
  const [profilePicture, setImage] = useState("");
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const fetchData = async () => {
    try {
      const response = await getUserById();
      setData(response);

      // console.log(response, "response in editProfile");
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // console.log(data,'see data');
  useEffect(() => {
    fetchData();
  }, []);


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData for the request
    const formDataToSend = new FormData();
    formDataToSend.append('firstname', data.firstname);
    formDataToSend.append('lastname', data.lastname);
    formDataToSend.append('email', data.email);
    formDataToSend.append('password', data.password);

    // // Append the profile picture file to the FormData if it exists
    if (profilePicture) {
      formDataToSend.append('profilePicture', profilePicture);
    }

    try {
      // Make an API request using axios (replace the URL with your API endpoint)
      const response = await axios.put(`http://localhost:4002/api/user/updateuser/${localStorage.getItem("id")}`, formDataToSend);
console.log(response,"gdsyhb sdhhdghhhhhhhhhhh");
      // Handle the response from the server
      console.log('Server Response:', response.data);

      // Reset the form or perform any other necessary actions
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle errors (show an error message, etc.)
    }
  };


  return (
    // <form onSubmit={handleSubmit}>
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Edit Profile
      </Typography>
      <div className="">
        <p>{data.firstname} {data.lastname}</p>
        <p>{data.email}</p>
        <p>{data.password}</p>
        <p>{data.profilePicture}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              name="firstname"
              value={data.firstname}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              name="lastname"
              value={data.lastname}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={data.email}
              onChange={handleChange}
            // disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              fullWidth
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="profile-picture-upload"
              type="file"
              name="profilePicture"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <label htmlFor="profile-picture-upload">
              <Button variant="contained" component="span" color="primary" fullWidth>
                Upload New Profile Picture
              </Button>
            </label>
          </Grid>
        </Grid>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ width: '48%' }}
          >
            Save Changes
          </Button>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            style={{ width: '48%' }}
          >
            Logout
          </Button>
        </Box>
      </form>
    </Container>
    //  </form>
  );
};

export default EditProfile;
