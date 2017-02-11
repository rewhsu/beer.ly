import React, { PropTypes } from 'react';
import CartItem from '../CartItem/CartItem';
import styles from './BeerCart.css';
import App from '../App/App';
import RaisedButton from 'material-ui/RaisedButton';

const cartSize = 4;

class BeerCart extends React.Component {
  constructor(props) {
    super(props);

  }

  onHover() {
    alert('hellokevin')
  }

  render() {
  const cartItems = this.props.beers.map((beer, index) => {
    debugger;
    return <CartItem 
                  key={index} 
                  beer={beer} 
                  index={index}
                  onClick={this.onHover.bind(this)}
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

  const saveFlight = <button onClick={this.props.saveFlight}>saveFlight</button>
  
  const deleteFlight = <button onClick={this.props.removeCart.bind(this)}>remove</button> 

  return (
    <div className={styles.movingUp}>
      <div className={styles.details}>
        {cartDetailsHandler}
      </div>
      <div className={styles.cartRow}>
        {cartItems}
        {saveFlight}
        {deleteFlight}
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
