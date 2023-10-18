const express = require('express');
const router = express.Router();
const verifyToken = require('../Middleware/auth');
const Post = require('../Model/Posts');

// POST information

router.get('/', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.userId }).populate('user', ['username']);
        res.json({ success: true, posts });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body;

    if (!title) return res.status(400).json({ success: false, message: 'title is required' });

    try {
        const newPost = new Post({
            title,
            description,
            url: url.startsWith('https://') ? url : `https://${url}`,
            status: status || 'TO LEARN',
            user: req.userId,
        });

        await newPost.save();
        res.json({ success: true, message: 'HAPPY HACKING', post: newPost });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: 'Internal server error' });
    }
});

// PUT infomation

router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body;

    if (!title) return res.status(400).json({ success: false, message: 'title is required' });

    try {
        let updatePost = {
            title,
            description: description || '',
            url: (url.startsWith('https://') ? url : `https://${url}`) || '',
            status: status || 'TO LEARN',
        };

        const updatePostCondition = { _id: req.params.id, user: req.userId };
        updatePost = await Post.findOneAndUpdate(updatePostCondition, updatePost, { new: true });

        if (!updatePost) return res.status(401).json({ success: false, message: 'Post not found' });
        res.json({ success: true, message: 'HAPPY HACKING', post: updatePost });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: 'Internal server error' });
    }
});

// DELETE infomation

router.delete('/:id', verifyToken, async (req, res, next) => {
    try {
        const deleteCondition = { _id: req.params.id, user: req.userId };
        const deletePost = await Post.findOneAndDelete(deleteCondition);

        if (!deletePost) return res.status(401).json({ success: false, message: 'Post not found' });

        res.json({ success: true, message: 'HAPPY HACKING', post: deletePost });
    } catch (error) {}
});

module.exports = router;
