const express = require('express');
const axios = require('axios');

const app = express();
const port = 5000;

const someData = async () => {
  try {
    return await axios.get('https://jsonplaceholder.typicode.com/todos/1');
  } catch(err) {
    console.log(err.message);
  }
}
let title = '';
const checkData = async () => {
  const response = await someData()

  if (response.data) {
    console.log(response.data.title);
    title = response.data.title;
  }
}

checkData();

app.get('/api', (req, res) => { 
  const string = "Hello World! " + title;
  res.json(string);
});

app.listen(port, () => console.log(`Server started on port ${port}`));