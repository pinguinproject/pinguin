const events = require('./events.js');
const messages = require('./messages.js');
const nests = require('./nests.js');
const users = require('./users.js');

module.exports = function(app, db) {
  events(app, db);
  messages(app,db);
  nests(app,db);
  users(app,db);
  // Other route groups could go here, in the future
};