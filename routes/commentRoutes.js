const express = require('express');
const router = express.Router();


// Your actual route
const { addComment, editComment, deleteComment } = require('../controllers/commentController');
const { route } = require('./authRoutes');
router.post('/:id', addComment);
router.put('/:id', editComment)
router.delete('/:id', deleteComment);

module.exports = router;
