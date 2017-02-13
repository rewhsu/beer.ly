import React from 'react';
import styles from './Review.css';

class Review extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var isNotReview;
    var isNotProfile;
    if(this.props.isProfile) {
      isNotReview = {
        display: 'none'

      }
    }
    if(this.props.isReview) {
      isNotProfile = {
        display: 'none',
        height: '150px',

      }
    }
    return (
      <div className={styles.grid}>
        <div className={styles.type}>
          <img style={isNotReview} className={styles.image} src={this.props.checkin.user.user_avatar} />
          <div style={isNotReview} className={styles.userName}>{this.props.checkin.user.user_name}</div>
          
          <div className={styles.beerInfo}>
            <div>
              <img style={isNotProfile} className={styles.beerLabel} src={this.props.checkin.beer.beer_label} />
              <div style={isNotProfile} className={styles.beerName}>{this.props.checkin.beer.beer_name}</div>
            </div>
      
            <div className={styles.reviewComment}>
              <div>Rating: {this.props.checkin.rating_score}</div>
              <br></br>
              <div>Comment: {this.props.checkin.checkin_comment}</div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

Review.propTypes = {
  checkin: React.PropTypes.object.isRequired,
};

export default Review;
