const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const secrets = require("./secrets.json");

const app = express();
const port = 5000;

//configuring express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let type = "";
let lat = "";
let lng = "";
let searchQuery = "Victory column";
let location = "";
let address = "";

const getData = async () => {
  try {
    return await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${searchQuery}%2C%20${location}&key=${
        secrets.API_KEY
      }&language=en&pretty=1&countrycode=de&limit=1`
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
      address = response.data.results[0].formatted;
      // console.log(response.data.results[0]);
    }
  } catch (err) {
    console.log("Error in handleData(): ", err.message);
  }
};

handleData();

app.get("/api", (req, res) => {
  const geolocation = {
    type: type,
    lat: lat,
    lng: lng,
    address: address
  };
  res.json(geolocation);
});

app.post("/submitQuery", (req, res) => {
  const response = "Thanks for submitting the query.";
  console.log(req.body);
  res.json(response);
});

app.listen(port, () => console.log(`Server started on port ${port}`));
