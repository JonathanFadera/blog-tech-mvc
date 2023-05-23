const express = require('express');
const router = express.Router();
const { User, Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth.js');
const { validationResult } = require('express-validator');

// GET all blogs and include user and comment data
router.get('/', (req, res) => {
  Blog.findAll({
    include: [User, Comment],
  })
    .then((dbBlogData) => res.json({ data: dbBlogData }))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

// GET a single blog by id and include user and comment data
router.get('/:id', (req, res) => {
  Blog.findByPk(req.params.id, { include: [User, Comment] })
    .then((dbBlogData) => {
      if (!dbBlogData) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      res.json({ data: dbBlogData });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

// CREATE a new blog
router.post('/', withAuth, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Blog.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user.id,
  })
    .then((newBlogData) => {
      res.json({ data: newBlogData });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

// UPDATE a blog by id withAuth middleware
router.put('/:id', withAuth, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Blog.update(req.body, {
    where: { id: req.params.id },
  })
    .then((updatedBlogData) => {
      if (updatedBlogData[0] === 0) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      res.json({ data: updatedBlogData });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

// DELETE a blog by id withAuth middleware
router.delete('/:id', withAuth, (req, res) => {
  Blog.destroy({
    where: { id: req.params.id },
  })
    .then((deletedBlogData) => {
      if (deletedBlogData === 0) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      res.json({ data: deletedBlogData });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

module.exports = router;
