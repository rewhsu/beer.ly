import React, { PropTypes } from 'react';
import BeerItem from '../BeerItem/BeerItem';
import styles from './BeerList.css';

const BeerList = (props) => {
  const input = props.filter.toLowerCase();
  const beers = props.beers.map((beer) => {
    if (!input || !!beer.beer.beer_name.toLowerCase().includes(input)) {
      return <BeerItem key={beer.beer.bid} beer={beer.beer} className={styles.beerItem} isBeingRenderedInCart={false} addToCart={props.addToCart} />;
    }
  });
  return (
    <div className={styles.grid}>
      {beers}
    </div>
  );
};

BeerList.propTypes = {
  beers: PropTypes.array,
  addToCart: PropTypes.func
};


export default BeerList;
