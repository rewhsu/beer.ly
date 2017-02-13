import React from 'react';
import Review from './../Review/Review.js'
import styles from './UserCheckins.css';

class UserCheckins extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.type}>
     
            <h3 className={styles.heading}>User Checkins</h3>
            {this.props.checkins.items.map((checkin, i) =>
              <Review checkin={checkin} isProfile={true} key={i}/>
            )}
        
        </div>
      </div>
    );
  }
}

UserCheckins.propTypes = {
  checkins: React.PropTypes.object.isRequired,
};

export default UserCheckins;
