import React, { PropTypes } from 'react';
import axios from 'axios';
import BreweryList from '../BreweryList/BreweryList';
import styles from './City.css';
import SearchFilter from '../SearchFilter/SearchFilter';
import ReactSpinner from 'react-spinjs'
import Sorting from '../Sorting/Sorting';

class City extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: this.props.params.city,
      breweries: [],
      searchInput: '',
      showSpinner: true
    };
  }

  componentDidMount() {
    this.fetchBreweries();
  }

  fetchBreweries() {
    if (this.state.city === '') {
      this.setState({ breweries: [] });
      return;
    }

    const context = this;
    axios.get('api/breweries/' + this.state.city)
      .then((response) => {
        const newBreweries = this.handleSuccess(response);
        context.setState({ breweries: newBreweries });
        context.setState({showSpinner: false});
      })
      .catch((error) => {
        this.handleError(error);
      });
  }

  handleSuccess(response) {
    return response.data.map((brewery) => brewery);
  }

  handleError(error) {
    console.log(error);
  }

  handleChange = (event) => {
    this.setState({searchInput: event.target.value});
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.heading}>
          <h1>Breweries in {this.state.city}</h1>
          { this.state.showSpinner ? <ReactSpinner config={{top: "50%", left: "50%"}} /> : null }
          
          <p className={styles.details}>About {this.state.breweries.length} results ({(1 / this.state.breweries.length).toFixed(5)} seconds) </p>
          
          <div className={styles.sortingFiltering}>
          <Sorting className={styles.sorting} breweries={this.state.breweries}/>
          <div className={styles.filterBrewery}>
            <input type="search"
              className="form-control" 
              placeholder="Search"
              value={this.state.searchInput}
              onChange={this.handleChange}
            />
          </div>
          </div>
          <br></br>
        </div>
        <div className={styles.breweryList}>
          <BreweryList 
            breweries={this.state.breweries} 
            city={this.state.city}          
            filter={this.state.searchInput}
          />
        </div>

      </div>
    );
  }
}

City.propTypes = {
  params: PropTypes.object
};

export default City;
