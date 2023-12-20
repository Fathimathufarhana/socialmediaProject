import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios"
import { errorToast, successToast } from "../../Toast/Toast.jsx"

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {

  const navigate = useNavigate()

  const [formData,setFormData] = useState({
    email:"",
firstname:"",
lastname:"",
password:""
  })

  // const [email,setEmail] =useState(null);
  // const [firstname, setFirstname] = useState(null);
  // const [lastname, setLastname] = useState(null);
  // const [password,setPassword] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureName, setProfilePictureName] = useState('');
  const [stateError,setStateError] = useState(false)
  const [message, setMessage] = useState(false)
  


const handleInputChange= (e) =>{
  console.log(e.target.name,"handleInputChange");
  if(e.target.name === 'firstname'){

    if(Boolean(e.target.value.match(/^[a-zA-Z\s]+$/
    ))){
      setStateError(false)
      setMessage('')
    }else{
      setStateError(true)
      setMessage("OOPS!!  invalid firstName")
    }
  }
   else if(e.target.name === 'lastname'){
    if(Boolean(e.target.value.match(/^[a-zA-Z\s]+$/
    ))){
      setStateError(false)
      setMessage('')
    }else{
      setStateError(true)
      setMessage("invalid lastName")
    }
  }
  else if(e.target.name === 'email'){
      
      if(Boolean(e.target.value.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    ))){
      setStateError(false)
      setMessage('')
    }else{
      setStateError(true)
      setMessage("OOPS!!  invalid email")
    }
  
  }
  else if(e.target.name === 'password'){
    
    if(Boolean(e.target.value.match( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ))){
      setStateError(false)
      setMessage('')
    }else{
      setStateError(true)
      setMessage("Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character.")
    }
  
  }
  
    setFormData({ ...formData, [e.target.name]: e.target.value})
}

  // const handleEmail = (e)=>setEmail(e.target.value);
  // const handleFirstName= (e)=>setFirstname(e.target.value);
  // const handleLastName= (e)=>setLastname(e.target.value);
  // const handlePassword = (e)=>setPassword(e.target.value);
  const handleProfilePictureChange = (e) => {
    const selectedFile = e.target.files[0];
    setProfilePicture(selectedFile);
    setProfilePictureName(selectedFile ? selectedFile.name : '');
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('firstname', formData.firstname);
      formDataToSend.append('lastname', formData.lastname);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('profilePicture', profilePicture);
      
      const response = await axios.post('http://localhost:4002/api/user/register', formDataToSend);
      console.log(formDataToSend,"formdataa");

      if (response.data) {
        console.log(response.data,"response");
        successToast("success");
        navigate('/');
      } else {
        console.error("Error while registering user:", response.data.message);
        errorToast(response.data.message);
      }
    } catch (error) {
      console.error("Error in API call:", error.message);
      errorToast(error.response.data.message || "An unexpected error occurred");
    }
  };





  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  label="First Name"
                  autoFocus
                />
              {stateError && formData.firstname &&( <p style={{ color: "red" }}>OOPS!! invalid firstName</p>)}
              </Grid>


              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  name="lastname"
                  autoComplete="family-name"
                  />
              {stateError && formData.lastname &&( <p style={{ color: "red"}}>OOPS!! invalid lastName</p>)}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                />
              {stateError && formData.email &&( <p style={{ color: "red" }}>OOPS!! invalid email</p>)}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  id="password"
                  autoComplete="new-password"
                />
              {stateError && formData.password &&( <p style={{ color: "red" }}>Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character.</p>)}
              </Grid>

              <Grid item xs={12}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="profile-picture-upload"
            type="file"
            onChange={handleProfilePictureChange}
          />
          <label htmlFor="profile-picture-upload">
            <Button
              variant="contained"
              component="span"
              fullWidth
              sx={{ mt: 2 }}
            >
              Upload Profile Picture
            </Button>
          </label>
          {profilePictureName && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {profilePictureName}
                </Typography>
              )}
        </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}