import React, { useState } from "react";
import axios from "axios";
import WeatherForm from "./componets/WeatherForm";
import WeatherInfo from "./componets/WeatherInfo";
import styles from "./App.module.css";
// aggiungere import bootstrap
// sistemare css globale( migliorare)
// aggiungere api corretta

const App = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      setError("City not found");
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Weather App</h1>
      <WeatherForm fetchWeather={fetchWeather} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weather && <WeatherInfo weather={weather} />}
    </div>
  );
};

export default App;
