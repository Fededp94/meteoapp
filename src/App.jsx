import React, { useState } from "react";
import axios from "axios";
import WeatherForm from "./components/WeatherForm";
import WeatherInfo from "./components/WeatherInfo";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./App.module.css";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);

    try {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      setError("City not found");
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>FedeMeteo.com</h1>
      <WeatherForm fetchWeather={fetchWeather} />
      {loading && <p>Caricamento...</p>}
      {error && <p>{error}</p>}
      {weather && <WeatherInfo weather={weather} />}
    </div>
  );
};

export default App;
