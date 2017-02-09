import React from 'react';
import axios from 'axios';
import AutoComplete from 'material-ui/AutoComplete';
import BeerList from '../BeerList/BeerList';
import BeerCart from '../BeerCart/BeerCart';
import Checkout from '../Checkout/Checkout';
import styles from './Brewery.css';

const inlineStyles = {
  inputStyle: {
    color: 'black',
  },
  underlineStyle: {
    borderColor: 'black',
  },
  floatingLabelStyle: {
    color: 'black',
    'fontSize': '12px',
  },
  floatingLabelFocusStyle: {
    color: 'black',
  },
};

const dataSourceConfig = {
  text: '',
  value: 'valueKey',
};

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

  handleChange = (inputValue) => {
    this.setState({searchInput: inputValue});
  }


  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <h1>{this.props.params.brewery}</h1>
          {console.log('beers: ', this.state.beers)}
          <p className={styles.details}><strong>{this.state.beers.length}</strong> beers to choose from!</p>
        
        <div className={styles.filterBeer}>
          <AutoComplete
            dataSource={this.state.beers}
            onUpdateInput={this.handleChange}
            floatingLabelText="Search beers..."
            inputStyle={inlineStyles.inputStyle}
            underlineFocusStyle={inlineStyles.underlineStyle}
            floatingLabelStyle={inlineStyles.floatingLabelStyle}
            value={this.state.searchInput}
          />
        </div>

        </div>
        
       
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
