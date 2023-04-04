const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

function getPosts(includeComments = true) {
    const include = [        { model: User, attributes: ['username'] },
    ];
    if (includeComments) {
        include.push({
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: { model: User, attributes: ['username'] },
        });
    }
    return Post.findAll({
        attributes: ['id', 'content', 'title', 'created_at'],
        order: [['created_at', 'DESC']],
        include,
    });
}

router.get('/', (req, res) => {
    getPosts()
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    getPosts().then(posts => {
        const post = posts.find(p => p.id === +req.params.id);
        if (!post) {
            res.status(404).json({ message: 'No post found with this id' });
        } else {
            res.json(post);
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
    Post.create({
            title: req.body.title,
            content: req.body.post_content,
            user_id: req.session.user_id
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', withAuth, (req, res) => {
    Post.update({
            title: req.body.title,
            content: req.body.post_content,
        }, {
            where: {
                id: req.params.id,
            },
        })
        .then(dbPostData => {
            if (!dbPostData[0]) {
                res.status(404).json({ message: 'No post found with this id' });
            } else {
                res.json(dbPostData);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
            where: {
                id: req.params.id,
            },
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
            } else {
                res.json(dbPostData);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;