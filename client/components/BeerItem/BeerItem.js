import React, { PropTypes } from 'react';
import styles from './BeerItem.css';
import axios from 'axios';
import IconButton from 'material-ui/IconButton';
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { default as Fade } from 'react-fade';
import LazyLoad from 'react-lazy-load';

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

const iconStyles = {
  position: 'fixed',
  top: 0,
  width: 100,
};

class BeerItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: null,
      open: false
    };
    this.fetchBeerInfo = this.fetchBeerInfo.bind(this);
    this.imageHandler = this.imageHandler.bind(this);
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

  imageHandler() {
    var style = this.props.beer.beer_style.toUpperCase();
    console.log(style);
    var imgIndex = 3;
    if (style.search('PILSNER') !== -1 || style.search('BLONDE') !== -1) {
      imgIndex = 1;
    }
    if (style.search('RED') !== -1 || style.search('ALE') !== -1) {
      imgIndex = 3;
      console.log('RED/ALE');
    }
    if (style.search('DARK') !== -1 || style.search('STOUT') !== -1 || style.search('PORTER') !== -1 || style.search('BLACK')) {
      imgIndex = 4;
      console.log('DARK');
    }
    if (style.search('IPA') !== -1) {
      imgIndex = 5;
      console.log('IPA');
    }
    if (style.search('SAISON') !== -1) {
      imgIndex = 8;
      console.log('SAISON');
    }
    if (style.search('SOUR') !== -1 || style.search('GOSE') !== -1) {
      imgIndex = 1;
      console.log('SOUR/GOSE');
    }
    return imgIndex;
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {  
    console.log('props', this.props);
    const handleClick = () => {
      const beer = {
        name: this.props.beer.beer_name,
        image: this.props.beer.beer_label
      };
      this.props.addToCart(beer);
    };

    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];

    // Handles situation when brewery does not supply information
    const abvHandler = () => {
      return (this.props.beer.beer_abv) ?
        (<strong className={styles.abv}>{this.props.beer.beer_abv}% ALC/VOL</strong>) :
        (<strong className={styles.abv}>_.__% ALC/VOL</strong>);
    };

    const descriptionHandler = () => {
      return (this.props.beer.beer_style) ?
        (<p className={styles.description}>{this.props.beer.beer_style}</p>) :
        (<p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed...</p>);
    };

    return (
      <LazyLoad className={styles.cell} offset={150}>
      <Fade duration={.5}>
      <div>
        <div>
          <IconButton onTouchTap={this.handleOpen}>
            <ActionInfoOutline style={iconStyles} />
            <Dialog
              title={this.props.beer.beer_name}
              actions={actions}
              modal={true}
              open={this.state.open}
              autoScrollBodyContent={true}
            >
              <br />
              <br />
              <img src={this.props.beer.beer_label} className={styles.image} />
              <p>Style: {this.props.beer.beer_style}</p>
              <p>IBU: {this.props.beer.beer_ibu}</p>
              <p>ABV: {this.props.beer.beer_abv}%</p>
              <p>Average rating: {this.props.beer.rating_score}</p>

              <p>{this.props.beer.beer_description}</p>

            </Dialog>
          </IconButton>
        </div>

        <div onClick={this.fetchBeerInfo} className={styles.title}>
          {this.props.beer.beer_name}
        </div>
        <img src={mockImages[this.imageHandler()]} className={styles.image} />
        { /* Optional information handlers */ }
        { abvHandler() } { descriptionHandler() }
        <button className={styles.addButton} onClick={handleClick} >Add to Flight</button>

      </div>
        </Fade>
      </LazyLoad>
    );
  }

}

BeerItem.propTypes = {
  beer: PropTypes.object
};


export default BeerItem;
