const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());

const PORT = 5000;

app.get("/weather", async (req, res) => {
  const { city } = req.query;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "City not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});