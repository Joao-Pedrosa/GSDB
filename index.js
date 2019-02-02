const express = require('express');
const path = require('path');
const db = require('./dbaccess');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile('view/index.html', { root: __dirname });
});

app.get('/test-db-connection', (req, res) => {
  db.testConnection((err, data) => {
    if (err) throw err;
    res.json(data);
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
