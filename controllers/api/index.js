const router = require('express').Router();

router.use('/users', require('./user-routes.js'));
router.use('/posts', require('./post-routes.js'));
router.use('/comments', require('./comment-routes.js'));

module.exports = router;
