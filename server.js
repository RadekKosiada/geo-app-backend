const express = require("express");
const axios = require("axios");
const secrets = require("./secrets.json");

const app = express();
const port = 5000;

const someData = async () => {
  try {
    return await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=Moabit%2C%20Berlin&key=${
        secrets.API_KEY
      }&language=en&pretty=1`
    );
  } catch (err) {
    console.log(err.message);
  }
};
let type = "";
let lat = "";
let lng = "";
const checkData = async () => {
  const response = await someData();

  if (response.data) {
    type = response.data.results[0].components._type;
    lat = response.data.results[0].geometry.lat;
    lng = response.data.results[0].geometry.lng;
    console.log(type, lat, lng);
  }
};

checkData();

app.get("/api", (req, res) => {
  const string = "Hello World! ";
  res.json(string);
});

app.listen(port, () => console.log(`Server started on port ${port}`));
