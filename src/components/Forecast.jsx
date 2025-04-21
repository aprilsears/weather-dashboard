import styles from '../styles/Forecast.module.css';

const Forecast = ({ data }) => {
  if (!data || !data.list) return null;

  // Group forecast data by day
  const dailyForecasts = data.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc[date] && Object.keys(acc).length < 5) {
      acc[date] = item;
    }
    return acc;
  }, {});

  return (
    <div className={styles.container}>
      <h2>5-Day Forecast</h2>
      <div className={styles.forecastItems}>
        {Object.values(dailyForecasts).map((forecast) => {
          const date = new Date(forecast.dt * 1000);
          const tempC = Math.round(forecast.main.temp);
          const tempF = Math.round((tempC * 9/5) + 32);
          const description = forecast.weather[0].description;
          
          return (
            <div key={forecast.dt} className={styles.forecastItem}>
              <p>{date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
              <h3>{tempC}°C / {tempF}°F</h3>
              <p>{description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;

