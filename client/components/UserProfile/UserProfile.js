import React from 'react';
import styles from './UserProfile.css';
import RecentBrews from './../RecentBrews/RecentBrews.js'
import UserInfo from './../UserInfo/UserInfo.js'
import UserCheckins from './../UserCheckins/UserCheckins.js'


import axios from 'axios'

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      recentBrews: null
    }
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    var context = this;
    var username;
    console.log(this.props.params);
    if(this.props.params.username) {
      username = this.props.params.username;
    } else {
      username = ''
    }
      
    var url = `https://localhost:5000/api/user/${username}`;
    axios.get(url)
      .then((response) => {
        context.handleSuccess(response.data)
      })
      .catch((error) => {
        context.handleError(error);
      });
  }

  handleSuccess(response) {
    console.log('SUCCESS', response);
    this.setState({
      userInfo: response.response.user,
      recentBrews: response.response.user.recent_brews
    });
  }

  handleError(error) {
    console.log(error);
  }

  render() {
    return (
      <div className={styles.grid}>
        <div className={styles.type}>
          <div className={styles.container}>
            <div className='preScrollableFixed'>
              <h1>User Profile</h1>
              {this.state.userInfo !== null ?
              <div className=''>
                <UserInfo userInfo={this.state.userInfo} />
                <RecentBrews recentBrews={this.state.recentBrews} />
                <UserCheckins checkins={this.state.userInfo.checkins} />
              </div>
              :null}
            </div>
          </div>
        </div>
      </div>
    );
  }

  
}

UserProfile.propTypes = {
};

export default UserProfile;
