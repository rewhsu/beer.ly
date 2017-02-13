import React from 'react';
import styles from './UserInfo.css';

class UserInfo extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log('UserInfo PROPS', this.props);
    return (
      <div className={styles.grid}>
        <div className={styles.type}>
          <div className={styles.preScrollableFixed}>
            <h3>User Info</h3>
            {console.log(this.props)}
            <h4>{this.props.userInfo.user_name}</h4>
            <img src={this.props.userInfo.user_avatar_hd} />
            <div>
              <div>Total Badges: {this.props.userInfo.stats.total_badges}</div>
              <div>Total Beers: {this.props.userInfo.stats.total_beers}</div>
              <div>Total Checkins: {this.props.userInfo.stats.total_checkins}</div>
              <div>Total Friends: {this.props.userInfo.stats.total_friends}</div>
              <div>Total Photos: {this.props.userInfo.stats.total_photos}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserInfo.propTypes = {
  userInfo: React.PropTypes.object.isRequired,
};

export default UserInfo;
