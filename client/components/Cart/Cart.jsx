import React from 'react';
import Drawer from 'material-ui/Drawer';
import Badge from 'material-ui/Badge';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import ShoppingCartIcon from 'material-ui/svg-icons/action/shopping-cart';
// import styles from './Cart.css';


const iconStyles = {
  marginRight: 24,
};

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {open: false};

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    const beersInCart = this.props.cart.map((beer, index) => {
    console.log('i need image', this.props.cart)
      return <ListItem 
              primaryText={beer.name} 
              leftAvatar={<Avatar src={beer.image}/>}
              key={index} 
              />;
    });
    
    return (
      <div onClick={this.handleToggle}>
        <Badge badgeContent={this.props.cart.length} secondary={true} badgeStyle={{top: 8, right: 8}}>
          <IconButton tooltip="Cart">
            <ShoppingCartIcon style={iconStyles} />
          </IconButton>
        </Badge>
        <Drawer
          docked={false}
          openSecondary={true}
          width={400}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        > 
          <List>
            <Subheader>Shopping Cart</Subheader>
            {beersInCart}
            <button>Checkout</button>
          </List>
        </Drawer>
      </div>
    );
  }
}

Cart.propTypes = {
  cart: React.PropTypes.array
};

export default Cart;
