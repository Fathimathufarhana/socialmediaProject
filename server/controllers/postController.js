import Post from "../models/Post.js";

export const createPost = async (req, res) => {
    try {
        const { description, userid } = req.body;

        console.log(req.body, "bodyyyyyyyyyyy");

        if (!description) {
            return res.status(400).json({ message: "Description is required" });
        }
        if (!userid) {
            return res.status(400).json({ message: "id is required" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Upload an image" });
        }
        console.log(req.file, "req.file in createPost");
        const postPicture = req.file.filename;

        const newPost = new Post({ description, postPicture: postPicture, userid });
        console.log(newPost, "newPost");

        const savedPost = await newPost.save();

        console.log(savedPost.description, "description");

        res.status(201).json(savedPost);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};


export const getAllPosts = async (req, res) => { //grabs every posts from everyone
    try {
        const post = await Post.find()
        res.status(200).json(post)
// console.log(post,"pppppppppppppooooooooooooooossssssssssstttttttttt");
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getPost = async (req,res) => {
    const {id} = req.params
    console.log(id,"iiiiddddddddd");
    try {
          let response = await Post.find({userid:id}) 
        //   console.log(userid,"uuuuuuussssserrrrrrrridddddd");
          console.log(response,"response in getPost");   
          res.status(201).json(response)  
    } catch (error) {
        res.status(401).json({message:error.message})
    }
}

export const likePost = async (req, res) => {
    // console.log("kkkkkkkkkkk");
    const { userid, postid } = req.body;
    // console.log(userid,postid, "userId, postId");
    console.log(userid,'userid')
    console.log(postid,"postid");

    try {
        const post = await Post.findById(postid); // Grab post info
        console.log(post, "post");

        if (!post) {
            return res.status(404).json({ message: "The post does not exist!" });
        }

        const existingLike = post.likes.find((item) => item.userid === userid);

        if (existingLike) {
            post.likes.pull({ userid: userid, islike: true });
            await post.save();
            res.json({ message: 'unliked' });
        } else {

            post.likes.push({ userid: userid, islike: true })
            await post.save();
            res.json({ message: 'Post liked successfully' });
        }

        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const postComment= async (req, res) => {
    const { userid, text } = req.body;
    const { postId } = req.params;
  
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "The post does not exist!" });
    }
      post.comments.push({ userid, text });
      const savedPost = await post.save();
      res.json(savedPost);
    } catch (error) {
      res.status(500).json({ error: error.message});
    }
  };



  export const getComment= async (req, res) => {
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




// export const commentPost = async (req, res) => {
//     try {

//         const { id } = req.params
//         const { userId } = req.body
//         const post = await Post.findById(id) //grab post info
//         const isCommented = post.comments.get(userId) //check whether the userId exist or not. if it is existed that means that the post is liked by the particular user

//         if (isCommented) {
//             post.comments.delete(userId) //dislike the post if it is already liked
//         } else {
//             post.comments.set(userId, true) //likes the post if its not liked
//         }

//         const updatedPost = await Post.findByIdAndUpdate(id, { comments: post.comments }, { new: true }) //updates a specific post

//         res.status(200).json(updatedPost)

//     } catch (error) {
//         res.status(404).json({ message: error.message })

//     }
// }