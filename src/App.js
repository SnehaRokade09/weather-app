import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  // Dynamic background
  let bgStyle = {
    background: "linear-gradient(to right, #74ebd5, #acb6e5)",
    minHeight: "100vh",
  };

  if (weather) {
    const condition = weather.weather[0].main;

    if (condition === "Clear") {
      bgStyle = {
        background: "linear-gradient(to right, #fceabb, #f8b500)",
        minHeight: "100vh",
      };
    } else if (condition === "Clouds") {
      bgStyle = {
        background: "linear-gradient(to right, #bdc3c7, #2c3e50)",
        minHeight: "100vh",
      };
    } else if (condition === "Rain") {
      bgStyle = {
        background: "linear-gradient(to right, #00c6fb, #005bea)",
        minHeight: "100vh",
      };
    }
  }

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/weather?city=${city}`
      );
      setWeather(res.data);
      setError("");
    } catch (err) {
      setError("City not found!");
      setWeather(null);
    }
  };

  return (
    <div className="container" style={bgStyle}>
      <div className="card">
        <h1>🌤️ Weather App</h1>

        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={fetchWeather}>Search</button>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div>
            <h2>{weather.name}</h2>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt="weather icon"
            />

            <p>{weather.main.temp} °C</p>
            <p>{weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;