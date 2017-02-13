import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Cart from '../Cart/Cart';
import styles from './NavBar.css';
import BeerCart from '../BeerCart/BeerCart'

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const isHomePage = this.props.location.pathname === '/';
    const logo = isHomePage ? styles.lightLogo : styles.logo;
    const cart = isHomePage ? null : <Cart cart={this.props.cart} location={this.props.location.pathname}/>;
    const navbar = isHomePage ? styles.transparentNavbar : styles.navbar;

    return (
        <nav className={navbar}>
          <h1>
            <Link to="/" className={logo}>Beer.ly</Link>
          </h1>
          <h3>
            <a className={styles.login} href='https://localhost:8008/oauth2/auth'>Login</a>
          </h3>
          <h3>
            <Link className={styles.profile} to="/profile">Profile</Link>
          </h3>
          <div className={styles.testing}>
          {this.props.cart.length > 0 ? 
            <BeerCart
              beers={this.props.cart} 
              removeCart={this.props.removeFromCart.bind(this)} 
              inCheckout={this.props.inCheckout} 
              checkout={this.props.checkout}
              location={this.props.location.pathname} /> : null}
          </div>
          <ul>
            <li>
              {cart}
            </li>
          </ul>
        </nav>
    );
  }
}

Nav.propTypes = {
  location: PropTypes.object.isRequired,
  cart: PropTypes.array
};

export default Nav;
