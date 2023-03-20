const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
// Use bodyParser middleware to parse request bodies as JSON
app.use(bodyParser.json());

// Use cors middleware to enable cross-origin resource sharing
app.use(cors());
// handle GET request to retrieve objects on map
app.get("/objects", async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    // make request to FCC API to retrieve objects
    const response = await axios.get(
      `https://geo.fcc.gov/api/census/area?lat=${latitude}&lon=${longitude}&format=json`
    );

    // extract relevant data from response
    const objects = response.data.results.map((result) => ({
      name: result.name,
      location: {
        latitude: result.lat,
        longitude: result.lon,
      },
    }));

    // return objects as JSON
    res.json(objects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// start servers
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
