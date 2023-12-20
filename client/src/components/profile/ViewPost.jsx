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
import { getUserById } from '../../service/apiService';
import Footer from '../common/Footer';
import { errorToast, successToast } from '../../Toast/Toast';




const ViewPost = () => {
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState({});
  const [commentInput, setCommentInput] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  
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
      const response = await axios.get('http://localhost:4002/posts');
      setPosts(response.data);
      console.log(response.data, "response in viewpost");
      // console.log(response.data[0]._id, "id in viewpost");
  
    } catch (error) {
      console.error('Error fetching posts:', error.message);
      errorToast("Failed to load post!");
    }
  }







  useEffect(() => {
    fetchData();
    fetchPosts();
    // getComments()
  },[]);



 


  const getComments = async (postid) => {
    try {
      const response = await axios.get(`http://localhost:4002/posts/${postid}/comments`);
      if (!response.data.comments) {
        console.error('Comments not found');
        return;
      }
      setComments(response.data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error.message);
    }
  };

  const handleCommentIconClick = (postid) => {
    setShowComments(!showComments);
    getComments(postid);
  };

  const handleCommentInputChange = (event) => {
    setCommentInput(event.target.value);
  };

  

  
  
  const handlePostComment = async(postid) => {
    console.log(postid,"postid in handlePostComment");
    // console.log(text,"tttttttttteeeeeexttttttttt");
    try {
      
      const userid = localStorage.getItem('id');
      console.log(userid,"userId");
      
      if (!userid) {
        console.error('userid not found');
        return;
      }
// if(!text){
//   console.error('text is required');
// }
      const response = await axios.post(`http://localhost:4002/posts/${postid}/comments`, { userid, text:commentInput})

      console.log(response.data.comments, 'comment response')


      successToast("comment posted");
      fetchPosts()
      getComments(postid);
    } catch (error) {
      console.error('Error in post comment:', error.message);
      errorToast("Failed to Post Comment")
    }
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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', marginTop: 'auto', marginLeft: '6rem' }}>
      <CssBaseline />
      <Container maxWidth="md" style={{ marginTop: '16px', flexGrow: 1 }}>
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item key={post._id} xs={12}>
              <Paper elevation={3} style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src={`http://localhost:4002/uploads/${userData.profilePicture}`} />
                  <Typography variant="subtitle1" style={{ marginLeft: '8px' }}>
                    {/* {userData.firstname} {userData.lastname} */}
                    {post.userid} {post.firstname}
                  </Typography>
                </div>
                <div style={{ marginTop: '8px' }}>
                  <Typography variant="caption" color="textSecondary">{post.createdAt}</Typography>
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
                    <IconButton color="primary" onClick={()=>handleCommentIconClick(post._id)}>
                      <ChatBubbleOutline />
                    </IconButton>
                    <Typography variant="body2" style={{ marginTop: '10px' }} >
                    {post.comments.length}  Comments
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

                    {comments.map((comment, commentIndex) => (
                      <div key={commentIndex} style={{ marginTop: '8px', display: 'flex', alignItems: 'center' }}>
                        <Avatar src={`http://localhost:4002/uploads/${comment.userid}/profilePicture`} />
                        <div style={{ marginLeft: '8px' }}>
                          <Typography variant="subtitle2">{comment.userid}</Typography>
                          <Typography variant="body2">{comment.text}</Typography>
                          {comment.timestamp && (
                            <Typography variant="caption" color="textSecondary">{comment.timestamp}</Typography>
                          )}
                          {/* Add a timestamp if available in your comment data */}
                        </div>
                      </div>
                    ))}


                  {/* <div>
                  <h2>Comments:</h2>
                  <ul>
                    {comments.map((comment, index) => (
                      <li key={index}>{`${comment.userid}: ${comment.text}`}</li>
                    ))}
                  </ul>
                </div> */}

                    {/* )} */}




                    {/* Add comment input and logic to post new comments */}
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Add a comment..."
                      value={commentInput}
                      onChange={handleCommentInputChange}
                    />
                    <IconButton color="primary" onClick={() => handlePostComment(post._id)}>
                      <ChatBubbleOutline />
                    </IconButton>
                  </div>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>


      <Footer />

    </div>
  );
};

export default ViewPost;
