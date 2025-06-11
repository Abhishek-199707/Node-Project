const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },
    text: { type: String, required: true },
    author: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User'
},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);