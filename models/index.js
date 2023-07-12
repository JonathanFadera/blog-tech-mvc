const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

// User can have many blogs
User.hasMany(Blog, {
    foreignKey: 'creator_id',
  });
  
  User.hasMany(Comment, {
    foreignKey: 'blogger_id',
  });
  
  Blog.belongsTo(User, {
    foreignKey: 'creator_id',
  });
  
  Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
  });
  
  Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
  });
  
  Comment.belongsTo(User, {
    foreignKey: 'blogger_id'
  });
  

module.exports = { User, Blog, Comment };