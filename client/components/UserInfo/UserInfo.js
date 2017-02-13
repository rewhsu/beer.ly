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
        <div className={styles.userInfo}>
            <h1>{this.props.userInfo.user_name}</h1>
            <img className={styles.userImg} src={this.props.userInfo.user_avatar_hd} />
            <div className={styles.detailWrapper}>
              <div>Badges 🏅: {this.props.userInfo.stats.total_badges}</div>
              <div>Beers 🍺: {this.props.userInfo.stats.total_beers}</div>
              <div>Checkins 📍: {this.props.userInfo.stats.total_checkins}</div>
              <div>Friends 😊: {this.props.userInfo.stats.total_friends}</div>
              <div>Photos 📷: {this.props.userInfo.stats.total_photos}</div>
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
