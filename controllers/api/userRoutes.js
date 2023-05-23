const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const { User, Blog, Comment } = require('../../models');
const bcrypt = require('bcrypt');

// GET all users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] },
  })
    .then((dbUserData) => res.json({ data: dbUserData }))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

// Logout by hitting /api/users/logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// GET a single user
router.get('/:id', (req, res) => {
  User.findByPk(req.params.id, { include: [Blog, Comment] })
    .then((dbUserData) => {
      if (!dbUserData) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ data: dbUserData });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

// CREATE a user
router.post('/', (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((newUserData) => {
      req.session.user = {
        id: newUserData.id,
        username: newUserData.username,
        loggedIn: true,
      };
      res.json({ data: newUserData });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

// Login by hitting /api/users/login
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((foundUserData) => {
      if (!foundUserData) {
        return res.status(400).json({ error: 'No user account found' });
      }

      if (bcrypt.compareSync(req.body.password, foundUserData.password)) {
        req.session.user = {
          id: foundUserData.id,
          username: foundUserData.username,
          loggedIn: true,
        };
        return res.json({ data: foundUserData });
      } else {
        return res.status(400).json({ error: 'Incorrect password' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

// UPDATE a user
router.put('/:id', (req, res) => {
  User.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedUserData) => {
      if (!updatedUserData[0]) {
        return res.status(404).json({ error: 'No user found with this id' });
      }
      res.json({ data: updatedUserData });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

// DELETE a user
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedUserData) => {
      if (!deletedUserData) {
        return res.status(404).json({ error: 'No user found with this id' });
      }
      res.json({ data: deletedUserData });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

module.exports = router;
