module.exports = function(app, db) {
  app.post('/messages', (req, res) => {
    // You'll create your note here.
    res.send('Hello')
  });
};