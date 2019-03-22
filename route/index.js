const events = require('./events.js');
const messages = require('./messages.js');
const nests = require('./nests.js');
const users = require('./users.js');
const comments = require('./comments.js');
const notifications = require('./notifications.js');
const posts = require('./posts.js');
const users_in_nests = require('./users_in_nests.js');
const users_in_events = require('./users_in_events.js');

module.exports = function(app, db) {
  events(app, db);
  messages(app,db);
  nests(app,db);
  users(app,db);
  comments(app,db);
  notifications(app,db);
  posts(app,db);
  users_in_nests(app,db);
  users_in_events(app,db);
  // Other route groups could go here, in the future
};