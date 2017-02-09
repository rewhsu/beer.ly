import React, { PropTypes } from 'react';
import styles from './BeerItem.css';
import axios from 'axios';

const mockImages = [
  'https://s3-us-west-1.amazonaws.com/beer.ly/beers/beer1.png',
  'https://s3-us-west-1.amazonaws.com/beer.ly/beers/beer2.png',
  'https://s3-us-west-1.amazonaws.com/beer.ly/beers/beer3.png',
  'https://s3-us-west-1.amazonaws.com/beer.ly/beers/beer4.png',
  'https://s3-us-west-1.amazonaws.com/beer.ly/beers/beer5.png',
  'https://s3-us-west-1.amazonaws.com/beer.ly/beers/beer6.png',
  'https://s3-us-west-1.amazonaws.com/beer.ly/beers/beer7.png',
  'https://s3-us-west-1.amazonaws.com/beer.ly/beers/beer8.png',
  'https://s3-us-west-1.amazonaws.com/beer.ly/beers/beer9.png',
  'https://s3-us-west-1.amazonaws.com/beer.ly/beers/beer10.png'
];

class BeerItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: null
    }
    this.fetchBeerInfo = this.fetchBeerInfo.bind(this);

  }

  fetchBeerInfo() {
    const context = this;
    const bid = this.props.beer.bid;
    axios.get('/api/beerInfo/' + bid)
      .then((response) => {
        context.handleSuccess(response.data);
      })
      .catch((error) => {
        context.handleError(error);
      });
  }

  handleSuccess(info) {
    this.setState({
      info: info.response.beer
    });
    console.log(this.state.info);
  }

  handleError(error) {
    console.log(error);
  }

  render() {  
    const handleClick = () => {
      const beer = {
        name: this.props.beer.beer_name,
        image: this.props.beer.beer_label
      };
      this.props.addToCart(beer);
    };

    // Handles situation when brewery does not supply information
    const abvHandler = () => {
      return (this.props.beer.abv) ?
        (<strong className={styles.abv}>{this.props.beer.abv}% ALC/VOL</strong>) :
        (<strong className={styles.abv}>7.25% ALC/VOL</strong>);
    };

    const descriptionHandler = () => {
      return (this.props.beer.description) ?
        (<p className={styles.description}>{this.props.beer.description.substring(0, 60)}...</p>) :
        (<p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed...</p>);
    };

    return (
      <div className={styles.cell}>
        <div onClick={this.fetchBeerInfo} className={styles.title}>
          {this.props.beer.beer_name}
        </div>
        <img src={this.props.beer.beer_label} className={styles.image} />
        { /* Optional information handlers */ }
        { abvHandler() } { descriptionHandler() }
        <button className={styles.addButton} onClick={handleClick} >Add to Flight</button>

      </div>
    );
  }

};

BeerItem.propTypes = {
  beer: PropTypes.object
};


export default BeerItem;
