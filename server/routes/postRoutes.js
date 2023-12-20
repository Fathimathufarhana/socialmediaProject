
import express from "express"
// import { commentPost, createPost, getAllPosts, likePost } from "../controllers/postController.js"
import { createPost, getAllPosts, getComment, getPost, likePost, postComment} from "../controllers/postController.js"
import multer from "multer";
import path from "path"

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Save uploaded files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext); // Append timestamp to filename to avoid collisions
    },
  });
  
  const upload = multer({ storage:storage });

  router.post("/post", upload.single('postPicture'), createPost);

router.get("/", getAllPosts)
router.get("/myposts/:id",getPost)


router.post("/like", likePost)
router.post('/:postId/comments',postComment)
router.get('/:postId/comments',getComment)
// router.put("/:id/comment", verifyToken, commentPost)

export default router
