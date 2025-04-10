import React from 'react';
import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Weather Dashboard</h1>
      <p className={styles.subtitle}>Check your local weather conditions</p>
    </header>
  );
};

export default Header;