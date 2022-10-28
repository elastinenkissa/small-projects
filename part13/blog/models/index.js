const Blog = require('./blog');
const ReadingList = require('./readingList');
const User = require('./user');
const Session = require('./session');

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' });
Blog.belongsToMany(User, { through: ReadingList, as: 'readByUsers' });

User.hasOne(Session);
Session.belongsTo(User);

module.exports = { Blog, User, ReadingList, Session };
