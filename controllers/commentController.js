const Comment = require('../models/Comment');
const mongoose = require('mongoose');

 const addComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid post ID format" });
    }

    if (!comment) {
      return res.status(400).json({ error: "Comment content is required" });
    }

    const newComment = new Comment({
      postId: id,
      text: comment,
      author: req.user?.userId, // fix here
    });

    await newComment.save();

    res.status(201).json({
      message: "Comment added successfully!",
      comment: newComment,
    });
  } catch (error) {
    console.error("Error saving comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const editComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { text: comment },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(200).json({
      message: "Comment updated successfully!",
      comment: updatedComment,
    });
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(200).json({
      message: "Comment deleted successfully!",
      comment: deletedComment,
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addComment, editComment, deleteComment
};