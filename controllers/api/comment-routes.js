const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.findAll();
        res.json(comments);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Create a comment
router.post('/', withAuth, async (req, res) => {
    try {
        const comment = await Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        });
        res.json(comment);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;
