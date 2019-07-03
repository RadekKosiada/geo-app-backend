const express = require("express");
const axios = require("axios");
const secrets = require("./secrets.json");

const app = express();
const port = 5000;

let type = "";
let lat = "";
let lng = "";
let searchQuery = "Victory Column"
let location = "";

const getData = async () => {
  try {
    return await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${searchQuery}%2C%20${location}&key=${
        secrets.API_KEY
      }&language=en&pretty=1&countrycode=de`
    );
  } catch (err) {
    console.log("Error in getData(): ", err.message);
  }
};

const handleData = async () => {
  try {
    const response = await getData();

  if (response.data) {
    type = response.data.results[0].components._type;
    lat = response.data.results[0].geometry.lat;
    lng = response.data.results[0].geometry.lng;
    console.log(type, lat, lng);
  }
  } catch(err) {
    console.log("Error in handleData(): ", err.message);
  }
  
};

handleData();

app.get("/api", (req, res) => {
  const string = "Hello World! " + type;
  res.json(string);
});

app.listen(port, () => console.log(`Server started on port ${port}`));
