import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "20f781ef465467332a4cc09273ff48e7"; // <-- इथे तुझा API key टाक

  const getWeather = async () => {
    if (!city) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    // ❌ error handling
    if (data.cod !== 200) {
      alert("City not found ❌");
      setWeather(null);
      return;
    }

    setWeather(data);
  };

  return (
    <div className="app">
      <h1>🌤️ Weather App</h1>

      {/* Search Box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") getWeather();
          }}
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {/* Weather Data */}
      {weather && (
        <div className="weather-box">
          <h2>{weather.name}</h2>

          {/* Weather Icon */}
          <img
            src={
              weather.weather[0].icon
              ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
              : "https://via.placeholder.com/100"
            }
            alt="weather icon"
          />

          <p>🌡 Temp: {weather.main.temp} °C</p>
          <p>☁ Weather: {weather.weather[0].main}</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬 Wind: {weather.wind.speed} km/h</p>
        </div>
      )}
    </div>
  );
}

export default App;