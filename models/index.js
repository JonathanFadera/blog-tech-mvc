const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

// User can have many blogs
User.hasMany(Blog,);
Blog.belongsTo(User);

Blog.hasMany(Comment);
Comment.belongsTo(Blog);

User.hasMany(Comment);
Comment.belongsTo(User);

module.exports = { User, Blog, Comment };