import React, { PropTypes } from 'react';
import styles from './BeerItem.css';
import axios from 'axios';
import IconButton from 'material-ui/IconButton';
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { default as Fade } from 'react-fade';
import LazyLoad from 'react-lazy-load';
import Reviews from './../Reviews/Reviews';
import BeerSuggestions from './../BeerSuggestions/BeerSuggestions';


const mockImages = [
  'https://imgur.com/dESzTkZ.png',
  'https://imgur.com/dESzTkZ.png',
  'https://imgur.com/yNS6rMN.png',
  'https://i.imgur.com/9adVeEX.png',
  'https://imgur.com/dESzTkZ.png',
  'https://imgur.com/xxr7VhY.png',
  'https://imgur.com/dESzTkZ.png',
  'https://i.imgur.com/9adVeEX.png',
  'https://imgur.com/dESzTkZ.png',
  'https://imgur.com/dESzTkZ.png',
  // 'https://s3-us-west-1.amazonaws.com/beer.ly/beers/beer2.png',
  // 'https://s3-us-west-1.amazonaws.com/beer.ly/beers/beer3.png',
  // 'https://s3-us-west-1.amazonaws.com/beer.ly/beers/beer4.png',
  // 'https://s3-us-west-1.amazonaws.com/beer.ly/beers/beer5.png',
  // 'https://s3-us-west-1.amazonaws.com/beer.ly/beers/beer6.png',
  // 'https://s3-us-west-1.amazonaws.com/beer.ly/beers/beer7.png',
  // 'https://s3-us-west-1.amazonaws.com/beer.ly/beers/beer8.png',
  // 'https://s3-us-west-1.amazonaws.com/beer.ly/beers/beer9.png',
  // 'https://s3-us-west-1.amazonaws.com/beer.ly/beers/beer10.png'
];


const iconStyles = {
  position: 'fixed',
  top: 0,
  width: 50,
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
        context.setState({
          info: response.data.response.beer
        });
      })
      .catch((error) => {
        context.handleError(error);
      });
  }

  pic() {
    if (this.state.info) {
      return this.state.info.beer_label_hd;
    } else {
      return 'http://i.giphy.com/vbW83rOm8JZYI.gif';
    }
  }

  // reviewsHandler() {
  //   if (this.state.info) {
  //     return (
  //       <div>
  //         {this.state.info.checkins.items.map((item) => {
  //           <div>{item.rating_score}</div>
  //         })}
  //       </div>
  //     )
  //   }
  // }

  handleError(error) {
    console.log(error);
  }

  imageHandler() {
    var style = this.props.beer.beer_style.toUpperCase();
    var imgIndex = 9;
    if (style.search('LAGER') !== -1 || style.search('WIT') !== -1 || style.search('BLONDE') !== -1) {
      imgIndex = 6;
    } else if (style.search('SAISON') !== -1 || style.search('WHEAT') !== -1 || style.search('SESSION') !== -1) {
      imgIndex = 8;
    } else if (style.search('DARK') !== -1) {
      imgIndex = 7;
    } else if (style.search('STOUT') !== -1 || style.search('PORTER') !== -1 || style.search('BLACK') !== -1) {
      imgIndex = 4;
    } else if (style.search('PILSNER') !== -1) {
      imgIndex = 1;
    } else if (style.search('RED') !== -1) {
      imgIndex = 3;
    } else if (style.search('SOUR') !== -1 || style.search('GOSE') !== -1) {
      imgIndex = 1;
    } else if (style.search('IPA') !== -1 || style.search('PALE') !== -1) {
      imgIndex = 5;
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
        (<strong>{this.props.beer.beer_abv}% ALC/VOL</strong>) :
        (<strong>_.__% ALC/VOL</strong>);
    };

    const descriptionHandler = () => {
      return (this.props.beer.beer_style) ?
        (<p>{this.props.beer.beer_style}</p>) :
        (<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed...</p>);
    };

    const ratingHandler = () => {
      var ratingFloor = Math.round(this.props.beer.rating_score);
      var starArr = [];
      for (var i = 0; i < 5; i++) {
        if (i < ratingFloor) {
          starArr.push(<span>★</span>);
        } else {
          starArr.push(<span>☆</span>);
        }
      }
      return (
        <div>
          {starArr}
        </div>
      );
    };

    return (
      <LazyLoad className={styles.cell} offset={200}>
      <Fade duration={.5}>
      <div>
        <div>
          <IconButton onTouchTap={this.handleOpen} onClick={this.fetchBeerInfo}>
            <ActionInfoOutline style={iconStyles} />
            <Dialog
              title={this.props.beer.beer_name}
              actions={actions}
              modal={true}
              open={this.state.open}
              autoScrollBodyContent={true}
              contentStyle={{ width: '60%', maxWidth: 'none'}}
            >
            <br></br>
              <div className={styles.label} >
                <img src={this.pic()} className={styles.label} />
                <div className={styles.type}>
                  <div>Style: {this.props.beer.beer_style}</div>
                  <div>IBU: {this.props.beer.beer_ibu}</div>
                  <div>ABV: {this.props.beer.beer_abv}%</div>
                  <div>Average rating: {this.props.beer.rating_score}</div>
                </div>
                <br />
              </div>
              <div>{this.props.beer.beer_description}</div>
              {this.state.info !== null ? 
                <div>
                  <BeerSuggestions suggestions={this.state.info.similar} />
                  <Reviews checkins={this.state.info.checkins} />
                </div>
                :null}
            </Dialog>
          </IconButton>
        </div>

        <div onClick={this.fetchBeerInfo} className={styles.title}>
          {this.props.beer.beer_name}
        </div>
        <img src={mockImages[this.imageHandler()]} className={styles.image} />
        { /* Optional information handlers */ }
        <div>
          <div className={styles.abv}>{ abvHandler() } </div>
          <div className={styles.description}>{ descriptionHandler() }</div>
          <div className={styles.rating}>{ ratingHandler() }</div>
        </div>
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
