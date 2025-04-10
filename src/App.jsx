import React, { useState } from 'react';
import axios from 'axios';
import './styles/global.css';
import './styles/App.module.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [location, setLocation] = useState('');

  const fetchWeather = async (location) => {
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${location}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchForecast = async (location) => {
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=${location}&days=5`);
      setForecastData(response.data);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
    }
  };

  const handleSearch = (location) => {
    setLocation(location);
    fetchWeather(location);
    fetchForecast(location);
  };

  return (
    <div className="App">
      <Header />
      <SearchBar onSearch={handleSearch} />
      {weatherData && <CurrentWeather data={weatherData} />}
      {forecastData && <Forecast data={forecastData} />}
    </div>
  );
};

export default App;