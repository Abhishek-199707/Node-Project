const express = require('express');
 const router = express.Router();
const { createPostController, getAllPostsController, getPostByIdController, updatePostController, deletePostController } = require('../controllers/postController');

const protect = require('../middleware/authMiddleware');

router.post('/create', protect, createPostController);
router.get('/', getAllPostsController);
router.get('/:id', getPostByIdController);
router.put('/:id', protect, updatePostController);
router.delete('/:id', protect, deletePostController);

module.exports = router;
