import React from 'react';
import styles from '../styles/CurrentWeather.module.css';

const CurrentWeather = ({ data }) => {
  return (
    <div className={styles.container}>
      <h2>Current Weather</h2>
    </div>
  );
};

export default CurrentWeather;