import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Favorite, ChatBubbleOutline, Share } from '@mui/icons-material';
import axios from 'axios';
import { getUserById } from '../../../service/apiService';
import { successToast } from '../../../Toast/Toast';
import UserProfile from '../UserProfile';
import Header from "../../../components/common/Header"
import FriendList from '../FrienList';
import PostData from '../PostData';



const Myposts = () => {
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState({});
  const [commentInput, setCommentInput] = useState('');
  const [showComments, setShowComments] = useState(false);
  // console.log(posts, "postssss");
  // console.log(post,"post");



  const fetchData = async () => {
    try {
      const response = await getUserById();
      setUserData(response);
      // console.log(response, 'response');
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Handle error, show an error message, etc.
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:4002/posts/myposts/${localStorage.getItem("id")}`);
      console.log(response,"response in myPosts");
      setPosts(response.data);
    //   console.log(response.data[0], "response in viewpost");
      // console.log(response.data[0]._id, "id in viewpost");
  
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    }
  }

  useEffect(() => {
    fetchData();
    fetchPosts()
  }, []);



  const handleCommentIconClick = () => {
    setShowComments(!showComments);
  };

  const handleCommentInputChange = (event) => {
    setCommentInput(event.target.value);
  };

  const handlePostComment = (postIndex) => {
    // Add logic to post the comment to the corresponding post
    // For now, we'll just log the comment to the console
    console.log(`Comment posted on post ${postIndex + 1}: ${commentInput}`);
    // Clear the comment input
    setCommentInput('');
  };

  
  
  const handleLikeIconClick = async (postid) => {
    console.log(`${postid},'post'`);
    
    try {
      
      const userid = localStorage.getItem('id');
      console.log(userid,"userId");
      
      if (!userid) {
        console.error('userid not found');
        return;
      }

      const response = await axios.post('http://localhost:4002/posts/like', { userid, postid })

      console.log(response, 'likeresponse')


      successToast(response.data.message);
      fetchPosts()
    } catch (error) {
      console.error('Error liking post:', error.message);
    }
  }

  return (
    <div> 
        <Header/>
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', marginTop: 'auto', marginLeft: '6rem' }}>
       <div style={{marginLeft:"-6rem"}}><UserProfile/></div> 
       {/* <div style={{marginLeft:"-6rem"}}><PostData/></div>  */}


      <CssBaseline />
      <Container maxWidth="md" style={{ marginTop: '-20.5rem', flexGrow: 1 }}>
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item key={post._id} xs={12}>
              <Paper elevation={3} style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src={`http://localhost:4002/uploads/${userData.profilePicture}`} />
                  <Typography variant="subtitle1" style={{ marginLeft: '8px' }}>
                    {userData.firstname} {userData.lastname}
                  </Typography>
                </div>
                <div style={{ marginTop: '8px' }}>
                  <Typography variant="caption" color="textSecondary">18 dec 2023</Typography>
                </div>
                <div style={{ marginTop: "1rem" }}>{post.description}</div>
                <img src={`http://localhost:4002/uploads/${post.postPicture}`} alt="post" style={{ width: '100%', marginTop: '8px' }} />
                {/* {{console.log(post)}} */}
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                  <div style={{ display: 'flex' }}>
                    <IconButton style={  post.likes.length > 0 ? {color:"red"} : {color:"gray"}  } onClick={() => handleLikeIconClick(post._id)}>
                      <Favorite />
                    </IconButton>
                    <Typography variant="body2" style={{ marginTop: '10px' }}>
                      {/* {`${post.likes.lenght} Likes`} */}
                      {/* 0 likes */}
                      {post.likes.length} Likes
                    </Typography>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <IconButton color="primary" onClick={handleCommentIconClick}>
                      <ChatBubbleOutline />
                    </IconButton>
                    <Typography variant="body2" style={{ marginTop: '10px' }} >
                      1 Comments
                    </Typography>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <IconButton color="primary">
                      <Share />
                    </IconButton>
                  </div>
                </div>
                {showComments && (
                  <div style={{ marginTop: '16px' }}>
                    {/* Display comments */}
                    <Typography variant="subtitle2">Comments</Typography>

                    {/* {post.comments.map((comment, commentIndex) => ( */}
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center' }}>
                      <Avatar src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPfO37MK81JIyR1ptwqr_vYO3w4VR-iC2wqQ&usqp=CAU"} />
                      <div style={{ marginLeft: '8px' }}>
                        <Typography variant="subtitle2">userName</Typography>
                        <Typography variant="body2">BEAUTIFUL IMAGE</Typography>
                        <Typography variant="caption" color="textSecondary">2 min ago</Typography>
                      </div>
                    </div>

                    {/* )} */}




                    {/* Add comment input and logic to post new comments */}
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Add a comment..."
                      value={commentInput}
                      onChange={handleCommentInputChange}
                    />
                    <IconButton color="primary" onClick={() => handlePostComment(postIndex)}>
                      <ChatBubbleOutline />
                    </IconButton>
                  </div>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
      <div><FriendList/></div> 

      </div>
    //   {/* <Footer /> */}

    // </div>
  );
};

export default Myposts;
