import React from 'react';
import styles from './Reviews.css';
import Review from './../Review/Review.js'

class Reviews extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.grid}>
        <div className={styles.type}>
          <div className={styles.preScrollableFixed}>
            {this.props.checkins.items.map((checkin, i) =>
              <Review checkin={checkin} key={i}/>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Reviews.propTypes = {
  checkins: React.PropTypes.object.isRequired,
};

export default Reviews;
