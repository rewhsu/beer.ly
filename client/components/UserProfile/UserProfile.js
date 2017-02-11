import React, { PropTypes } from 'react';
import BeerItem from '../BeerItem/BeerItem';
import styles from './BeerList.css';

const BeerList = (props) => {
  return (
    <div className={styles.grid}>

    </div>
  );
};

BeerList.propTypes = {
  beers: PropTypes.array,
  addToCart: PropTypes.func
};


export default BeerList;
