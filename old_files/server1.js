const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const secrets = require("./secrets.json");

const app = express();
const port = 5000;

//configuring express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let searchQuery = ''

// app.post("/submitQuery", (req, res) => {
//   const response = "Thanks for submitting the query.";
//   console.log(req.body.searchQuery);
//   searchQuery = req.body.searchQuery;
//   res.json(response); 
//   // handleData(searchQuery); 
// });

// console.log("SQ",)
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
  }
};

app.get("/api/:location", (req, res) => {
  const searchQuery = req.params.location;
  const geolocation = {
    type: type,
    lat: lat,
    lng: lng,
    address: address
  };

  console.log("GEO", searchQuery)
  handleData(searchQuery)
  res.json(geolocation);
});


app.listen(port, () => console.log(`Server started on port ${port}`));