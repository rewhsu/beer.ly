import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Cart from '../Cart/Cart';
import styles from './NavBar.css';
import BeerCart from '../BeerCart/BeerCart'

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const isHomePage = this.props.location.pathname === '/';
    const logo = isHomePage ? styles.lightLogo : styles.logo;
    const cart = isHomePage ? null : <Cart cart={this.props.cart} location={this.props.location.pathname}/>;
    const beerCart = isHomePage ? null : <BeerCart
              beers={this.props.cart} 
              removeCart={this.props.removeFromCart.bind(this)} 
              inCheckout={this.props.inCheckout} 
              checkout={this.props.checkout}
              location={this.props.location.pathname} />;
    const navbar = isHomePage ? styles.transparentNavbar : styles.navbar;
    const login = isHomePage ? <MenuItem primaryText="Login" href='https://localhost:5000/oauth2/auth'/> : null;
    const profileStyle = isHomePage ? styles.whiteProf : styles.blackProf;

    return (
        <nav className={navbar}>
          <h1 className={styles.head}>
            <Link to="/" className={logo}>Beer.ly</Link>
            <div className={styles.menu}>
          <IconMenu
               iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
               anchorOrigin={{horizontal: 'left', vertical: 'top'}}
               targetOrigin={{horizontal: 'left', vertical: 'top'}}
             >
               {login}
               <MenuItem primaryText="Profile" containerElement={<Link to="/profile" />}/>
               <MenuItem primaryText="Sign out" containerElement={<Link to="/" />}/>
             </IconMenu>
        </div>
          </h1>
        
          <div className={styles.testing}>
          {this.props.cart.length > 0 ? beerCart : null}
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
