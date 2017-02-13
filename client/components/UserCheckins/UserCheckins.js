import React from 'react';
import Review from './../Review/Review.js'
import styles from './UserCheckins.css';

class UserCheckins extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log('UserCheckins PROPS', this.props);
    return (
      <div className={styles.grid}>
        <div className={styles.type}>
          <div className={styles.preScrollableFixed}>
            <h3>User Checkins</h3>
            {console.log(this.props)}
            {this.props.checkins.items.map((checkin) =>
              <Review checkin={checkin} isProfile={true} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

UserCheckins.propTypes = {
  checkins: React.PropTypes.object.isRequired,
};

export default UserCheckins;
