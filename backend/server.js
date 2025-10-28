const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 5000;

app.use(cors());

app.get('/api/wrestlers', (req, res) => {
  fs.readFile('wrestlers.json', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.listen(port, () => {
  console.log(`WWE Backend API listening on port ${port}`);
});