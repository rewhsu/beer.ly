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
        display: 'none'
      }
    }
    return (
      <div className={styles.grid}>
        <div className={styles.type}>
          <img style={isNotReview} className={styles.image} src={this.props.checkin.user.user_avatar} />
          <div style={isNotReview} >{this.props.checkin.user.user_name}</div>
          <div style={isNotProfile} >{this.props.checkin.beer.beer_name}</div>
          <img style={isNotProfile} className={styles.image} src={this.props.checkin.beer.beer_label} />
          <div className='reviewRating' >Rating: {this.props.checkin.rating_score}</div>
          <div className='reviewComment' >Comment: {this.props.checkin.checkin_comment}</div>
        </div>
      </div>
    );
  }
}

Review.propTypes = {
  checkin: React.PropTypes.object.isRequired,
};

export default Review;
