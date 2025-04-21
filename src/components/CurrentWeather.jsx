import React from 'react';
import styles from '../styles/CurrentWeather.module.css';

const CurrentWeather = ({ data }) => {
  if (!data) return null;

  const tempC = Math.round(data.main.temp);
  const tempF = Math.round((tempC * 9/5) + 32);
  const feelsLikeC = Math.round(data.main.feels_like);
  const feelsLikeF = Math.round((feelsLikeC * 9/5) + 32);
  const description = data.weather[0].description;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  return (
    <div className={styles.container}>
      <h2>Current Weather</h2>
      <div className={styles.weatherInfo}>
        <div className={styles.temperature}>
          <h3>{tempC}°C / {tempF}°F</h3>
          <p>{description}</p>
        </div>
        <div className={styles.details}>
          <p>Feels like: {feelsLikeC}°C / {feelsLikeF}°F</p>
          <p>Humidity: {humidity}%</p>
          <p>Wind: {windSpeed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;