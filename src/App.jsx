import React, { useState, useEffect, useCallback } from 'react';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatLocationQuery = (location) => {
    if (location.includes(' ')) {
      return `${location.replace(' ', ',')},US`;
    }
    return location;
  };

  const fetchForecast = useCallback(async (location) => {
    try {
      const formattedLocation = formatLocationQuery(location);
      const response = await axios.get(
        `${process.env.REACT_APP_WEATHER_BASE_URL}/forecast?q=${formattedLocation}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      );
      setForecastData(response.data);
    } catch (error) {
      setError('Error fetching forecast data');
    }
  }, []);

  const fetchWeatherByCoords = useCallback(async (lat, lon) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setLocation(response.data.name);
      await fetchForecast(response.data.name);
      setLoading(false);
    } catch (error) {
      setError('Error fetching weather data');
      setLoading(false);
    }
  }, [fetchForecast]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
          setError('Unable to get location. Please search for a city.');
          setLoading(false);
        }
      );
    }
  }, [fetchWeatherByCoords]);

  const fetchWeather = async (searchLocation) => {
    try {
      setLoading(true);
      const formattedLocation = formatLocationQuery(searchLocation);
      const response = await axios.get(
        `${process.env.REACT_APP_WEATHER_BASE_URL}/weather?q=${formattedLocation}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setLocation(searchLocation);
      setLoading(false);
    } catch (error) {
      setError('City not found. Please try again with a valid city name.');
      setLoading(false);
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
      {loading ? (
        <p>Loading weather data...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {location && <h2>Weather for {location}</h2>}
          {weatherData && <CurrentWeather data={weatherData} />}
          {forecastData && <Forecast data={forecastData} />}
        </>
      )}
    </div>
  );
};

export default App;