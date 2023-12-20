import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  AttachFileOutlined,
  DeleteOutlined,
  ImageOutlined,
} from '@mui/icons-material';
import UserProfile from './UserProfile';
import ViewPost from "./ViewPost"
import axios from 'axios';
import { getUserById } from '../../service/apiService';

const PostData = ({ picturePath }) => {
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState('');
  const [userData, setUserData] = useState({}); 
 const [refresh, setRefresh] = useState(false);
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  const mediumMain = theme.palette.grey[600];
  const medium = theme.palette.grey[500];


  const fetchData = async () => {
    try {
      const response = await getUserById();
      setUserData(response);
      setRefresh(false); // Reset refresh state
      return response; // Make sure to return the response
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Handle error, show an error message, etc.
      return null; // Return an appropriate value in case of an error
    }
  };
  


  

  const handlePost = async () => {
    const formData = new FormData();
    formData.append('description', post);
    formData.append('postPicture', image);
    formData.append('userid',localStorage.getItem("id"))
console.log(post,"description");
console.log(image.name,"image");
console.log(formData,"formData");
    try {
      // Make a POST request to your server
      const response = await axios.post("http://localhost:4002/posts/post", formData);
console.log(response,"responssssseeeeeeeeee");
      // Handle the response, for example, log it
      console.log('Post created successfully:', response.data);

      // Reset state
      setIsImage(false);
      setImage(null);
      setPost('');
      setRefresh(true);       //trigger refresh
    } catch (error) {
      console.error('Error creating post:', error.message);
    }
  };



 

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>    
    {/* <UserProfile data={user}/> */}
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      border="1px solid #ccc"
      borderRadius="8px"
      boxShadow="0 2px 4px rgba(0,0,0,0.1)"
      p="1rem"
      mt="2rem"
      marginLeft="24rem"
      marginTop="-20rem"
      marginBottom="1rem"
      maxWidth="53rem" // Adjust maxWidth as needed
    >
    {/* <h1 style={{color:"red"}}>hhhhh</h1> */}

       {/* <div style={{display:"flex", gap:"3.5rem"}}> */}
      <Box
        display="flex"
        alignItems="center"
        mb="1rem"
        gap="2.5rem"
        padding="1rem" // Added padding
      >
          <Avatar src={`http://localhost:4002/uploads/${userData.profilePicture}`} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          fullWidth
          sx={{
            backgroundColor: '#f2f2f2',
            borderRadius: '2rem',
            padding: '1rem 10rem',
          }}
        />
      </Box>

      {isImage && (
        <Box
          border={`2px dashed #2196F3`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
          padding="1rem" // Added padding
        >
          <input
            type="file"
            name="postPicture" 
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {!image ? (
            <Typography>Add Image Here</Typography>
          ) : (
            <Box display="flex" alignItems="center" mt="0.5rem">
              <Typography>{image.name}</Typography>
              <IconButton onClick={() => setImage(null)} sx={{ marginLeft: '1rem' }}>
                <DeleteOutlined />
              </IconButton>
            </Box>
          )}
        </Box>
      )}
      {/* </div> */}


      {/* <Divider sx={{ margin: '1rem 0' }} /> */}

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding="1rem" // Added padding
      >
          <div style={{display:"flex", gap:"3.5rem"}}>
        <Box display="flex" gap="0.5rem" onClick={() => setIsImage(!isImage)} >
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ '&:hover': { cursor: 'pointer', color: medium } }}
          >
            Image
          </Typography>
        </Box>

        {/* {isNonMobileScreens ? ( */}
            {/* <Box display="flex" gap="0.5rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </Box> */}

            <Box display="flex" gap="0.5rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </Box>

            {/* <Box display="flex" gap="0.5rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </Box> */}
         <Button
           disabled={!post}
           onClick={handlePost}
           sx={{
             color: '#fff',
             backgroundColor: '#2196F3',
             borderRadius: '3rem',
             cursor:"pointer"
           }}
         >
           POST
         </Button>
          </div>
        {/* ) */}
         {/* : ( */}
          {/* <Box display="flex" gap="0.5rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </Box> */}
        {/* )} */}

      </Box>
    </Box>

    <ViewPost refresh={refresh}/>
    </>

  );
};

export default PostData;
