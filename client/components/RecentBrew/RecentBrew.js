import React from 'react';
import styles from './RecentBrew.css';

class RecentBrew extends React.Component {
  constructor(props) {
    super(props)
  }



  render() {
    console.log('RECENTBREW PROPS', this.props);
    var rating;
    if(this.props.beer.beer.auth_rating === 0) {
      rating = "";
    } else {
      rating = this.props.beer.beer.auth_rating;
    }
    return (
      <div className={styles.grid}>
        <div className={styles.type}>
          <div className={styles.recentBrew}>
            <div className={styles.brewName} >{this.props.beer.beer.beer_name}</div>
            <img className={styles.brewImage} src={this.props.beer.beer.beer_label} />
            <div className={styles.brewRating} >Rating: {rating}</div>
          </div>
        </div>
      </div>
    );
  }
}

RecentBrew.propTypes = {
  beer: React.PropTypes.object.isRequired,
};

export default RecentBrew;
