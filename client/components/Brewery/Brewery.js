import React from 'react';
import axios from 'axios';
import AutoComplete from 'material-ui/AutoComplete';
import BeerList from '../BeerList/BeerList';
import BeerCart from '../BeerCart/BeerCart';
import Checkout from '../Checkout/Checkout';
import styles from './Brewery.css';


class Beers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beers: [],
      searchInput: ''
    };
  }

  componentDidMount() {
    this.fetchBeers();
  }

  fetchBeers() {
    const context = this;
    axios.get('/api/beers/' + this.props.params.brewery)
      .then((response) => {
        context.handleSuccess(response.data);
      })
      .catch((error) => {
        context.handleError(error);
      });
  }

  handleSuccess(beers) {
    this.setState({
      beers: beers
    });
  }

  handleError(error) {
    console.log(error);
  }

  handleChange = (event) => {
    this.setState({searchInput: event.target.value});
  }


  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <h1>{this.props.params.brewery}</h1>
          <p className={styles.details}><strong>{this.state.beers.length}</strong> beers to choose from!</p>
        
          <div className={styles.filterBeer}>
            <div className="right-inner-addon">
                <i className="icon-search"></i>
                <input type="search"
                  className="form-control" 
                  placeholder="Search"
                  value={this.state.searchInput}
                  onChange={this.handleChange}
                />
            </div>
          </div>
        </div>
        <br></br>
        <div>
          {this.props.cart.length > 0 ? <BeerCart beers={this.props.cart} removeFromCart={this.props.removeFromCart} inCheckout={this.props.inCheckout} checkout={this.props.checkout} /> : null}
          {this.props.inCheckout ?
            <Checkout />
            : <BeerList 
                beers={this.state.beers} 
                addToCart={this.props.addToCart} 
                filter={this.state.searchInput}
              />
          }
        </div>


      </div>
    );
  }
}

Beers.propTypes = {
  params: React.PropTypes.object,
  cart: React.PropTypes.array,
  inCheckout: React.PropTypes.bool,
  checkout: React.PropTypes.func,
  addToCart: React.PropTypes.func,
  removeFromCart: React.PropTypes.func
};

export default Beers;
