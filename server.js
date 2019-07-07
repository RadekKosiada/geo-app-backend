const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const secrets = require("./secrets.json");

const app = express();
const port = 5000;

//configuring express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let type1 = "";
let lat1 = "";
let lng1 = "";
let address1 = "";

// let type2 = "";
// let lat2 = "";
// let lng2 = "";
// let address2 = "";

let searchQuery = "";
let location = "";

let errorMessage = "Location could not be found";

app.post("/submitQuery/:param", async (req, res) => {
  const response = await [
    { message: "Thanks for submitting the query" },
    [ { geolocation: {} },
      { error: {} }
    ],
    [ { geolocation: {} },
      { error: {} }
    ],  
  ];
  // console.log("PARAM", Number(req.params.param), "RES", response[req.params.param])
  try {
    searchQuery = await req.body.searchQuery;
    let param = await Number(req.params.param);
    const fetchData = await handleData(searchQuery);

    if(param === 1) {
      const geolocation1 = {
        type: type1,
        lat: lat1,
        lng: lng1,
        address: address1
      };
      if (lat1) {
        response[param][0].geolocation = geolocation1;
        response[param][0].error = "";
      } else {
        response[param][0].error = errorMessage;
        response[param][0].geolocation = "";
      }
    }
    
    if(param === 2) {
      const geolocation2 = {
        type: type1,
        lat: lat1,
        lng: lng1,
        address: address1
      };
      if (lat1) {
        response[param][0].geolocation = geolocation2;
        response[param][0].error = "";
      } else {
        response[param][0].error = errorMessage;
        response[param][0].geolocation = "";
      }
    }
    
    console.log("PARAM", param, "RES", response[param])
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
      type1 = response.data.results[0].components._type;
      lat1 = response.data.results[0].geometry.lat;
      lng1 = response.data.results[0].geometry.lng;
      address1 = response.data.results[0].formatted;
      console.log("ONE data from handleData()", lat1, lng1);
    }
  } catch (err) {
    console.log("Error in handleData(): ", err.message);
    type1 = "";
    lat1 = ""; 
    lng1 = ""; 
    address1 = "";
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
