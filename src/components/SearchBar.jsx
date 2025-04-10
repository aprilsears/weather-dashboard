import styles from '../styles/SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  return (
    <div className={styles.searchContainer}>
      <input type="text" className={styles.input} placeholder="Enter city name..." />
      <button className={styles.button}>Search</button>
    </div>
  );
};

export default SearchBar;
