const postModel = require('../models/Post');

const createPostController = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all fields',
    });
  }

  try {
    const post = new postModel({
      title,
      content,
      author: req.user.userId 
    });

    console.log("Authenticated user:", req.user);

    await post.save();

    return res.status(201).json({
      success: true,
      message: 'Post created successfully',
      post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error,
    });
  }
}

const getAllPostsController = async (req, res) => {
  try {
    const posts = await postModel.find().populate('author', 'userName').sort({ createdAt: -1 });
    console.log("Posts retrieved:", posts);

    return res.status(200).json({
      success: true,
      message: 'Posts retrieved successfully',
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error,
    });
  }
}

const getPostByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postModel.findById(req.params.id).populate('author', 'userName');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Post retrieved successfully',
      post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error,
    });
  }
} 

const updatePostController = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all fields',
    });
  }

  try {
    const post = await postModel.findByIdAndUpdate(id, { title, content }, { new: true });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error,
    });
  }
}

const deletePostController = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postModel.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error,
    });
  }
}

module.exports = {
  createPostController,
  getAllPostsController,
  getPostByIdController,
  updatePostController,
  deletePostController,
};