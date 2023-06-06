const express = require('express');
const router = express.Router();
const { User, Blog, Comment } = require('../models');

// GET all blogs for homepage
router.get('/', (req, res) => {
  Blog.findAll({ include: [User] })
    .then((blogs) => {
      const hbsBlogs = blogs.map((blog) => blog.get({ plain: true }));
      const loggedIn = req.session.user ? true : false;
      res.render('home', {
        blogs: hbsBlogs,
        loggedIn,
        username: req.session.user?.username,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

// GET login page
router.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect('/dashboard');
  }
  res.render('login');
});

// GET signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// GET dashboard page
router.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  User.findByPk(req.session.user.id, { include: [Blog, Comment] })
    .then((userData) => {
      const hbsData = userData.get({ plain: true });
      hbsData.loggedIn = req.session.user ? true : false;
      res.render('dashboard', hbsData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

// GET single blog
router.get('/blog/:id', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  Blog.findByPk(req.params.id, {
    include: [User, { model: Comment, include: [User] }],
  })
    .then((blogData) => {
      const hbsBlog = blogData.get({ plain: true });
      const loggedIn = req.session.user ? true : false;
      console.log('=====================');
      console.log(hbsBlog);
      if (blogData.userId != req.session.user.id) {
        // if not the owner of the blog, redirect to dashboard
        return res.render('comment', {
          hbsBlog,
          loggedIn,
          username: req.session.user?.username,
        });
      }
      // if the owner of the blog, render update/delete page over your dashboard
      res.render('updateDelete', {
        hbsBlog,
        loggedIn,
        username: req.session.user?.username,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

// Default route (catch-all)
router.get('*', (req, res) => {
  res.redirect('/login');
});

module.exports = router;
