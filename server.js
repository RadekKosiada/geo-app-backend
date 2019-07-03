const express = require('express');

const app = express();

app.get('/api', (req, res) => {
  const string = "Hello World!"
  res.json(string);
})

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));