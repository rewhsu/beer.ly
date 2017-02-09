import React from 'react';
import styles from './SearchFilter.css';
// import axios from 'axios';


class SearchFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
  }

  handleChange = (inputValue) => {
    this.setState({ input: inputValue });
  }

  handleRequest = (breweryOrBeer) => {
    browserHistory.push('/' + cityName);
  }

  render() {
    const { filterVal, filterUpdate} = this.props
    return (
      <form>
        <input 
          type='text'
          placeholder='Type to filter..'
          // binding the input value to state
          value={this.state.input}
          onChange={this.handleChange()}
        /> 
      </form>
    )
  }
}

export default SearchFilter;