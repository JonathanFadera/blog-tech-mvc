const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const { User, Blog, Comment } = require('../../models');

// GET all comments and include user and blog data
router.get('/', (req, res) => {
  Comment.findAll({
    include: [User, Blog],
  })
    .then((dbCommentData) => res.json({ data: dbCommentData }))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

// GET a single comment
router.get('/:id', (req, res) => {
  Comment.findByPk(req.params.id, { include: [User, Blog] })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      res.json({ data: dbCommentData });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

// CREATE a new comment
router.post('/', (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.session.user.id,
    blog_id: req.body.blog_id,
  })
    .then((newCommentData) => {
      res.json({ data: newCommentData });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

// UPDATE a comment
router.put('/:id', (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Comment.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedCommentData) => {
      if (!updatedCommentData[0]) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      res.json({ data: updatedCommentData });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

// DELETE a comment
router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCommentData) => {
      if (!deletedCommentData) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      res.json({ data: deletedCommentData });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

module.exports = router;
