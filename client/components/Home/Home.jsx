import React from 'react';
import SearchCities from '../SearchCities/SearchCities';
import styles from './Home.css';

class Home extends React.Component {
  render() {
    return (
      <div className={styles.home}>
        <div className={styles.container}>
          <div className={styles.searchField}>
            <SearchCities />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
