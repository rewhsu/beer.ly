import React, { PropTypes } from 'react';
import CartItem from '../CartItem/CartItem';

import styles from './BeerCart.css';

import RaisedButton from 'material-ui/RaisedButton';

const cartSize = 4;

const BeerCart = (props) => {
  const cartItems = props.beers.map((beer, index) => {
    return <CartItem key={index} beer={beer} index={index} removeFromCart={props.removeFromCart} />;
  });

  const cartDetailsHandler = cartItems.length ?
    <p>Your Cart has {cartItems.length} / 4 selections</p>
    : <p>Your Cart is Empty!</p>;

  const button = props.inCheckout ?
    null
    : <button className={styles.button} primary onClick={props.checkout} label="Checkout">Checkout</button>;

  const checkout = props.beers.length === cartSize ? <div>{button}</div> : null;

  const saveFlight = <button onClick={props.saveFlight}>saveFlight</button>

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

BeerCart.propTypes = {
  inCheckout: PropTypes.bool,
  beers: PropTypes.array,
  checkout: PropTypes.func,
  removeFromCart: PropTypes.func,
};

// use later
export default BeerCart;
