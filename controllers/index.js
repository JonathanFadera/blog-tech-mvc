const express = require('express');
const router = express.Router();

const userRoutes = require('./api/userRoutes');
router.use('/api/users', userRoutes);

const blogRoutes = require('./api/blogRoutes');
router.use('/api/blogs', blogRoutes);

const commentRoutes = require('./api/commentRoutes');
router.use('/api/comments', commentRoutes);

const frontendRoutes = require('./frontendRoutes');
router.use('/', frontendRoutes);

router.get('/showsessions', (req, res) => {
    res.json(req.session);
});

module.exports = router;
