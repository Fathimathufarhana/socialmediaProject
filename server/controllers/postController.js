import mongoose from 'mongoose';
import Post from '../models/Post.js';
import User from '../models/User.js';

// export const createPost = async (req, res) => {
//   try {
//     const { description, userid, privacy } = req.body;

//     console.log(req.body, 'bodyyyyyyyyyyy');

//     if (!description) {
//       return res.status(400).json({ message: 'Description is required' });
//     }
//     if (!userid) {
//       return res.status(400).json({ message: 'id is required' });
//     }

//     if (!req.file) {
//       return res.status(400).json({ message: 'Upload an image' });
//     }
//     if (!privacy) {
//       return res.status(400).json({ message: 'Setting privacy is required' });
//     }

//     console.log(req.file, 'req.file in createPost');
//     const postPicture = req.file.filename;

//     // Convert privacy to boolean
//     const isPublic = privacy === "public";
// const newPost = new Post({ description, postPicture: postPicture, userid, privacy: isPublic });


//     console.log(newPost, 'newPost');

//     const savedPost = await newPost.save();

//     console.log(savedPost.description, 'description');

//     res.status(201).json(savedPost);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: error.message });
//   }
// };


// controllers/postController.js
export const createPost = async (req, res) => {
  try {
    const { description, userid, privacy } = req.body;

    if (!description || !userid || !req.file || !privacy === undefined) {
      return res.status(400).json({ message: 'Invalid request parameters' });
    }

    const postPicture = req.file.filename;
    const isPublic = privacy === "public";

    const newPost = new Post({
      description,
      postPicture,
      userid,
      privacy: isPublic
    });

    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};



export const updatedPost = async (req, res) => {
  const { privacy, postid } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(postid, { privacy }, { new: true });

    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating post privacy:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// export const getAllPosts = async (req, res) => {
//   try {
//     let response = await Post.find();
//     let rrr = await Promise.all(
//       response.map(async (post) => {
//         if (!post) {
//           return null; // handle the case where post is null
//         }

//         const { comments, ...others } = post._doc;

//         const user = await User.findOne({ _id: post.userid, privacy: true });

//         if (!user) {
//           return null; // handle the case where user is null
//         }

//         let r = await Promise.all(
//           comments.map(async (comment) => {
//             if (!comment) {
//               return null; // handle the case where comment is null
//             }

//             const { ...other } = comment._doc;

//             const user = await User.findById(comment.userid);
//             if (!user) {
//               return null; // handle the case where user is null
//             }

//             const { firstname, lastname, profilePicture, ...userDetails } = user._doc;

//             other.firstname = firstname;
//             other.lastname = lastname;
//             other.profilePicture = profilePicture;

//             return { ...other, ...userDetails };
//           })
//         );

//         others.comments = r.filter((comment) => comment !== null);
//         others.firstname = user.firstname;
//         others.lastname = user.lastname;
//         others.profilePicture = user.profilePicture;

//         return others;
//       })
//     );

//     // Filter out null values from the result array
//     const filteredResult = rrr.filter((result) => result !== null);
//     res.status(201).json(filteredResult);
//   } catch (error) {
//     res.status(401).json({ message: error.message });
//   }
// };



// export const getAllPosts = async (req, res) => {
//   try {
//     const response = await Post.find();
//     const filteredResult = response
//       .filter(post => post !== null && post.privacy === true)
//       .map(async post => {
//         const { comments, ...others } = post._doc;

//         const user = await User.findOne({ _id: post.userid, privacy: true });

//         if (!user) {
//           return null;
//         }

//         const r = await Promise.all(comments.map(async comment => {
//           const { ...other } = comment._doc;
//           const user = await User.findById(comment.userid);
          
//           if (!user) {
//             return null;
//           }

//           const { firstname, lastname, profilePicture, ...userDetails } = user._doc;
//           other.firstname = firstname;
//           other.lastname = lastname;
//           other.profilePicture = profilePicture;

//           return { ...other, ...userDetails };
//         }));

//         others.comments = r.filter(comment => comment !== null);
//         others.firstname = user.firstname;
//         others.lastname = user.lastname;
//         others.profilePicture = user.profilePicture;

//         return others;
//       });

//     const result = await Promise.all(filteredResult);
//     const finalResult = result.filter(res => res !== null);
    
//     res.status(201).json(finalResult);
//   } catch (error) {
//     res.status(401).json({ message: error.message });
//   }
// };


// controllers/postController.js
export const getAllPosts = async (req, res) => {
  try {
    const response = await Post.find();
    const rrr = await Promise.all(response.map(async (post) => {
      if (!post) {
        return null;
      }

      const { comments, ...others } = post._doc;
      const user = await User.findOne({ _id:new mongoose.Types.ObjectId(post.userid)});

      if (!user) {
        return null;
      }

      const r = await Promise.all(comments.map(async (comment) => {
        if (!comment) {
          return null;
        }

        const { ...other } = comment._doc;
        const user = await User.findById(comment.userid);

        if (!user) {
          return null;
        }

        const { firstname, lastname, profilePicture, ...userDetails } = user._doc;

        other.firstname = firstname;
        other.lastname = lastname;
        other.profilePicture = profilePicture;

        return { ...other, ...userDetails };
      }));

      others.comments = r.filter(comment => comment !== null);
      others.firstname = user.firstname;
      others.lastname = user.lastname;
      others.profilePicture = user.profilePicture;

      return others;
    }));

    const filteredResult = rrr.filter(result => result !== null);
    res.status(201).json(filteredResult);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};


export const getPost = async (req, res) => {
  const { id } = req.params;
  console.log(id, 'iiiiddddddddd');
  try {
    let response = await Post.find({ userid: id });
    console.log(response, 'response in getPost');
    res.status(201).json(response);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const { userid, postid } = req.body;

  try {
    const post = await Post.findById(postid);

    if (!post) {
      return res.status(404).json({ message: 'The post does not exist!' });
    }

    const existingLike = post.likes.find((item) => item.userid === userid);

    if (existingLike) {
      post.likes.pull({ userid: userid, islike: true });
      await post.save();
      res.json({ message: 'unliked' });
    } else {
      post.likes.push({ userid: userid, islike: true });
      await post.save();
      res.json({ message: 'Post liked successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postComment = async (req, res) => {
  const { userid, text, firstname, lastname } = req.body;
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'The post does not exist!' });
    }
    post.comments.push({ userid, text, firstname, lastname });
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getComment = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'The post does not exist!' });
    }

    const comments = post.comments;
    res.json({ comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.body;
    console.log(userId, friendId, 'llllllllll');

    if (userId === friendId) {
      console.log('same');
    }

    const user = await User.findById(userId);

    console.log(user, 'userId');

    const IsExistingFollower = user.friendlist.includes(friendId);

    if (IsExistingFollower) {
      user.friendlist.pull(friendId);
      await user.save();
      return res.status(200).json({ message: 'unfollowed successfully', user });
    } else {
      user.friendlist.push(friendId);
      await user.save();
      return res.status(200).json({ message: 'successfully followed', user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
