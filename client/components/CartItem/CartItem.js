import React, { PropTypes } from 'react';
import BeerCart from '../BeerCart/BeerCart';
import styles from './CartItem.css';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import UploadIcon from 'material-ui/svg-icons/file/cloud-upload';
import FolderIcon from 'material-ui/svg-icons/file/folder-open';

class CartItem extends React.Component {
  constructor(props) {
    super(props);
  }
  
  handleRemove() {
    this.props.removeFromCart(this.props.index)
  }

  render() {
  
  return (
      <div className={styles.container}>
        <div onClick={this.handleRemove.bind(this)}>
          <img className={styles.xButtonImage} src="https://s3-us-west-1.amazonaws.com/beer.ly/beers/grey-x.svg" />
        </div>
        <IconButton className={styles.iconButton} tooltip={this.props.beer.name}>
          <img src={this.props.beer.image} className={styles.image}/>
        </IconButton>
      </div>
    );
  };
}

CartItem.propTypes = {
  beer: PropTypes.object
};


export default CartItem;
