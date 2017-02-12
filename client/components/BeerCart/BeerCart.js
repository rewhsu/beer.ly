import React, { PropTypes } from 'react';
import CartItem from '../CartItem/CartItem';
import styles from './BeerCart.css';
import App from '../App/App';
import RaisedButton from 'material-ui/RaisedButton';

const cartSize = 4;

class BeerCart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      savingCart: [],
      currectCart: this.props.beers
    }
  }

  saveFlight() { 
    var savedCart = this.state.savingCart.push(this.props.currectCart)
    console.log('the func', savedCart)
    console.log('the savingcart', this.state.savingcart)
    this.setState({
       savingCart: savedCart,
       currectCart: null
    })
  } 

  render() {
  const cartItems = this.props.beers.map((beer, index) => {
    return <CartItem 
                  key={index}  
                  beer={beer} 
                  index={index}
                  removeFromCart={this.props.removeCart.bind(this)} 
                />;
  });

  const cartDetailsHandler = cartItems.length ?
    <p>Your Cart has {cartItems.length} / 4 selections</p>
    : <p>Your Cart is Empty!</p>;

  const button = this.props.inCheckout ?
    null
    : <button className={styles.button} primary onClick={this.props.checkout} label="Checkout">Checkout</button>;

  const checkout = this.props.beers.length === cartSize ? <div>{button}</div> : null;

  const saveFlight = <button onClick={this.saveFlight.bind(this)}>saveFlight</button>
  
  return (
    <div className={styles.movingUp}>
      <div className={styles.details}>
        {cartDetailsHandler}
      </div>
      <div className={styles.cartRow}>
        {cartItems}
        {saveFlight}
        {checkout}
      </div>
    </div>
    );
  };
}

BeerCart.propTypes = {
  inCheckout: PropTypes.bool,
  beers: PropTypes.array,
  checkout: PropTypes.func,
  removeFromCart: PropTypes.func,
};

// use later



export default BeerCart;
