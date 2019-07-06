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
let searchQuery = "";
let location = "";
let address = "";
let errorMessage = "Could not fetch data from the server";

app.post("/submitQuery", async (req, res) => {
  const response = await [
    { message: "Thanks for submitting the query" },
    { geolocation: {} },
    { error: {} }
  ];
  try {
    searchQuery = await req.body.searchQuery;
    const fetchData = await handleData(searchQuery);
    const geolocation = {
      type: type,
      lat: lat,
      lng: lng,
      address: address
    };
    if (lat) {
      response[1] = geolocation;
    } else {
      response[2] = errorMessage;
    }

    res.json(response);
  } catch (err) {
    console.log("Error in submitQuery: ", err);
  }
});

const handleData = async query => {
  try {
    //calling getData with query from handleData()
    const response = await getData(query);

    if (response.data) {
      type = response.data.results[0].components._type;
      lat = response.data.results[0].geometry.lat;
      lng = response.data.results[0].geometry.lng;
      address = response.data.results[0].formatted;
      console.log("data from handleData()", lat, lng);
    }
  } catch (err) {
    console.log("Error in handleData(): ", err.message);
    type = "";
    lat = "";
    lng = "";
    address = "";
  }
};

const getData = async query => {
  console.log("getData fired", query);
  try {
    return await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${query}%2C%20${location}&key=${
        secrets.API_KEY
      }&language=en&pretty=1&countrycode=de&limit=1`
    );
  } catch (err) {
    console.log("Error in getData(): ", err.message);
  }
};

app.listen(port, () => console.log(`Server started on port ${port}`));
