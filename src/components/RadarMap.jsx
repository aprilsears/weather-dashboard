import React, { useState } from 'react';
import styles from '../styles/RadarMap.module.css';

const RadarMap = ({ lat, lon }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  
  // Validate coordinates
  if (!lat || !lon) {
    return <div className={styles.container}>Loading coordinates...</div>;
  }

  // Calculate tile coordinates (using OpenStreetMap's Slippy Map format)
  const latToTile = (lat, zoom) => {
    const n = Math.pow(2, zoom);
    return Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * n);
  };

  const lonToTile = (lon, zoom) => {
    const n = Math.pow(2, zoom);
    return Math.floor(((lon + 180) / 360) * n);
  };

  const zoom = 10; // Increased zoom level for better visibility
  const tileX = lonToTile(lon, zoom);
  const tileY = latToTile(lat, zoom);

  // Create both base map and precipitation layer URLs
  const baseMapUrl = `https://tile.openstreetmap.org/${zoom}/${tileX}/${tileY}.png`;
  const precipitationUrl = `https://tile.openweathermap.org/map/precipitation/${zoom}/${tileX}/${tileY}.png?appid=${apiKey}`;

  const handleImageLoad = () => {
    setIsLoading(false);
    setError(null);
    console.log('Map loaded successfully');
  };

  const handleImageError = (e) => {
    setIsLoading(false);
    setError('Failed to load radar map. Please check your API key and try again.');
    console.error('Radar map failed to load:', { 
      lat, lon, zoom, tileX, tileY,
      error: e?.currentTarget?.error || 'Unknown error'
    });
  };

  return (
    <div className={styles.container}>
      <h2>Weather Radar</h2>
      <div className={styles.mapContainer}>
        {isLoading && <div className={styles.loading}>Loading radar map...</div>}
        {error && <div className={styles.error}>{error}</div>}
        
        {/* Base map layer */}
        <img 
          src={baseMapUrl}
          alt="Base map"
          className={styles.baseMap}
          crossOrigin="anonymous"
        />
        
        {/* Precipitation overlay */}
        <img 
          src={precipitationUrl}
          alt="Weather radar overlay"
          className={styles.radarOverlay}
          crossOrigin="anonymous"
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ opacity: 0.7 }}
        />
      </div>
    </div>
  );
};

export default RadarMap;