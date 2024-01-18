import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import { getUserById } from '../../service/apiService';
import { successToast, errorToast } from '../../Toast/Toast';

const PostData = () => {
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState('');
  const [userData, setUserData] = useState({}); 
  const [refresh, setRefresh] = useState(false);
  const [isToggled, setToggled] = useState(false);
  const [privacy, setPrivacy] = useState("public")

  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  const mediumMain = theme.palette.grey[600];
  const medium = theme.palette.grey[500];

  const fetchData = async () => {
    try {
      const response = await getUserById();
      setUserData(response);
      setRefresh(false);
      return response;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  const handlePost = async () => {
    const formData = new FormData();
    formData.append('description', post);
    formData.append('postPicture', image);
    formData.append('privacy', isToggled ? "public" : "private");
    formData.append('userid', localStorage.getItem("id"));

    try {
      const response = await axios.post("http://localhost:4002/posts/post", formData);
      console.log('Post created successfully:', response.data);
      setIsImage(false);
      setImage(null);
      setPost('');
      setRefresh(true);
      successToast('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error.message);
      errorToast(error.response?.data?.message || "An error occurred");
    }
  };

  // const handleClickToggle = (e) => {
  //   setPrivacy(e.target.value);
  //   setToggled(!isToggled);
  //   console.log(privacy,"post privacy");
  // };


  const handleClickToggle = (event) => {
    setPrivacy(event.target.value);
    setToggled(!isToggled);
    const toastMessage = isToggled
    ? 'Toggle button set to private successfully!'
    : 'Toggle button set to public successfully!';

  successToast(toastMessage);
  };


  useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <>    
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
        maxWidth="53rem"
      >
        <Box
          display="flex"
          alignItems="center"
          mb="1rem"
          gap="2.5rem"
          padding="1rem"
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
            padding="1rem"
          >
            <input
              type="file"
              name="postPicture" 
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <select
              name=""
              id=""
              onChange={handleClickToggle}
              value={isToggled ? 'public' : 'private'}
              style={{ 
                marginLeft: '0rem',
                backgroundColor: 'transparent',
                borderColor:'#2196F3',
                boxShadow:"1px 1px 2px",
                padding:"1px 3px 1px 1px",
                borderRadius:"3px"
              }}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
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

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          padding="1rem"
        >
          <div style={{display:"flex", gap:"3.5rem"}}>
            <Box display="flex" gap="0.5rem" onClick={() => setIsImage(!isImage)}>
              <ImageOutlined sx={{ color: mediumMain }} />
              <Typography
                color={mediumMain}
                sx={{ '&:hover': { cursor: 'pointer', color: medium } }}
              >
                Image
              </Typography>
            </Box>

            <Box display="flex" gap="0.5rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </Box>

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
        </Box>
      </Box>

      <ViewPost refresh={refresh}/>
    </>
  );
};

export default PostData;
