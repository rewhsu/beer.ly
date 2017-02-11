import React from 'react';
import styles from './Sorting.css';

class Sorting extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      popularity: 0,
      rating: 0,
      ibu: 0,
      abv: 0,
      sortBtnSelected: false
    };
	}

  filterData() {
  //    var filter = this.props.filter;
  //     var filteredData = this.props.data.filter((item) => {
  //       return (!filter || item.sex == filter)
  //     });

  //     return (
  //       <div className="filter-item">
  //         {filteredData.map(function(item) {
  //           return ( 
  //             <div>{item.name}</div>
  //           );
  //         })}
  //       </div>
  //     );
  //   }
  // });
  }

  handleChange(val) {
    this.setState({});
    console.log(val);
  }
  
  handleClick(event) {
    this.setState({sortBtnSelected: !this.state.sortBtnSelected})
    console.log('BTN SELECETED: ', this.state.sortBtnSelected)
  }

  render() {   
    return ( 
      <div className={styles.wrapper}>
      <div>
        <button className={this.state.sortBtnSelected ? "asc" : "desc"} onClick={this.handlePopularity}>Popularity △ ▽</button>
        <button className={this.state.sortBtnSelected ? "asc" : "desc"} onClick={this.handleABV}>ABV △ ▽</button>
        <button className={this.state.sortBtnSelected ? "asc" : "desc"} onClick={this.handleIBU}>IBU △ ▽</button>
        <button className={this.state.sortBtnSelected ? "asc" : "desc"} onClick={this.handleRatings}>Ratings △ ▽</button>
      </div>
      </div>
    );
  }

};

export default Sorting;
