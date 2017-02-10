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
    : <RaisedButton className={styles.button} primary onClick={props.checkout} label="Checkout" />;

  const checkout = props.beers.length === cartSize ? <div>{button}</div> : null;

  return (
    <div>
      <div className={styles.details}>
        {cartDetailsHandler}
      </div>
        <div>{checkout}</div>
        
      <div className={styles.cartRow}>
      {cartItems}

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

export default BeerCart;
