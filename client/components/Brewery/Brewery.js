import React from 'react';
import axios from 'axios';
import AutoComplete from 'material-ui/AutoComplete';
import BeerList from '../BeerList/BeerList';
import BeerCart from '../BeerCart/BeerCart';
import Checkout from '../Checkout/Checkout';
import styles from './Brewery.css';
import BeerData from './BeerListData_1149.json';
import ReactSpinner from 'react-spinjs';
import Sorting from '../Sorting/Sorting'

var beerList;
var copyBeers;

class Beers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beers: [],
      searchInput: '',
      showSpinner: true,
      sortBtn: null,
      sortState: 0,
      ascending: 0
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSort = this.handleSort.bind(this);

  }

  getInitialState() {
    this.setState({
      sortBtn: null,
      sortState: 0,
      beers: beerList,
      ascending: 0
    })
  }

  componentDidMount() {
    this.fetchBeers();
  }

  fetchBeers() {
    const context = this;
    axios.get('/api/beers/' + this.props.params.brewery)
      .then((response) => {
        beerList = response.data;
        copyBeers = response.data;
        this.setState({beers: response.data});
        context.setState({showSpinner: false});
      })
      .catch((error) => {
        context.handleError(error);
      });
  }


  handleError(error) {
    console.log(error);
  }

  handleChange(event) {
    this.setState({searchInput: event.target.value});
  }

  customSort(count, sortBy) {
    if (count === 0) {

    } else if (count === 1 || count % 2 === 1) {
      copyBeers.sort(function(a, b) {
        if (a.beer[sortBy] < b.beer[sortBy])
          return 1;
        if (a.beer[sortBy] > b.beer[sortBy])
          return -1;
        return 0;
      })
    } else if (count % 2 === 0) {
      copyBeers.sort(function(a, b) {
        if (a.beer[sortBy] < b.beer[sortBy])
          return -1;
        if (a.beer[sortBy] > b.beer[sortBy])
          return 1;
        return 0;
      })
    }
    this.setState({beers: copyBeers});
  }

  handleSort(count, sortBtn) {
    if (this.state.sortState === 0 || count % 3 === 0) {
      this.getInitialState();
    } else if (sortBtn === 'Pop'){
      this.customSort(count, 'rating_count');
    } else if (sortBtn === 'Rat') {
      this.customSort(count, 'rating_score');
    } else if (sortBtn === 'ABV') {
      this.customSort(count, 'beer_abv');
    } else if (sortBtn === 'IBU') {
      this.customSort(count, 'beer_ibu');
    }
  }

  handleClick(event) {
    event.persist();
    if (this.state.beers.length > 0 && this.state.sortBtn && event.target.innerText.slice(0, 3) !== this.state.sortBtn) {
      this.getInitialState();
    } else {
      var count = this.state.ascending + 1;
      console.log(count)
      this.handleSort(count, event.target.innerText.slice(0, 3));
      this.setState({
        sortBtn: event.target.innerText.slice(0, 3),
        sortState: this.state.sortState + 1,
        ascending: this.state.ascending + 1
        });
    };
  }


  render() {
    return (
      <div className={styles.wrapper}>

        <div className={styles.title}>
          <h1>{this.props.params.brewery}</h1>
          { this.state.showSpinner ? <ReactSpinner config={{top: "50%", left: "50%"}} /> : null }
          
          <p className={styles.details}><strong>{this.state.beers.length}</strong> beers to choose from!</p>   
          
          <div className={styles.sortingFiltering}>
            <Sorting className={styles.sorting} 
              beers={this.state.beers} 
              onClick={this.handleClick}
              sortBtn={this.state.sortBtn}
              sortState={this.state.sortState}
              ascending={this.state.ascending}/>

            <div className={styles.searchBar}>
                <input type="search"
                  className="form-control" 
                  placeholder="Search"
                  value={this.state.searchInput}
                  onChange={this.handleChange}
                />
            </div>
          </div>
          
        </div>
        <div className={styles.beerList}>
           <BeerList 
                beers={this.state.beers} 
                addToCart={this.props.addToCart} 
                filter={this.state.searchInput}
              />
          
        </div>


      </div>
    );
  }
}

Beers.propTypes = {
  params: React.PropTypes.object,
  cart: React.PropTypes.array,
  inCheckout: React.PropTypes.bool,
  checkout: React.PropTypes.func,
  addToCart: React.PropTypes.func,
  removeFromCart: React.PropTypes.func
};

export default Beers;
