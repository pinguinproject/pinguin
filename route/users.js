module.exports = function(app, db) {
  app.post('/users', (req, res) => {
    // You'll create your note here.
    res.send('Hello')
  });
};