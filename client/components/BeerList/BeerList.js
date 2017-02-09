import React, { PropTypes } from 'react';
import BeerItem from '../BeerItem/BeerItem';
import styles from './BeerList.css';

class BeerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    const input = this.props.filter.toLowerCase();
    const beers = this.props.beers.map((beer) => {
      if (!input || !!beer.beer.beer_name.toLowerCase().includes(input)) {
        return <BeerItem key={beer.beer.bid} beer={beer.beer} className={styles.beerItem} isBeingRenderedInCart={false} addToCart={this.props.addToCart} />;
      }
    });
    return (
      <div className={styles.grid}>
        {beers}
      </div>
    );
  }
};

BeerList.propTypes = {
  beers: PropTypes.array,
  addToCart: PropTypes.func
};


export default BeerList;
