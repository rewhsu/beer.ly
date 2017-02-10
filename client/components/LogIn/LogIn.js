import React from 'react';
import styles from './Login.css';
import {browserHistory} from 'react-router';
import axios from 'axios';

class LogIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }


  handleSubmit(event) {
    // Attempt login
    axios.post('auth/users/logIn/', this.state)
      .then((response) => {
        // Clear input fields
        this.setState({username: '', password: ''});
        if(response.data.success === true) {
          console.log('you are log in')
        } else {
          console.log('not you are not')
        }
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });

    event.preventDefault();
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  render() {
    return (
      <div className={styles.logIn}>
        <form className={styles.position} onSubmit={this.handleSubmit}>
          <h3> LogIn </h3>
            <label>
              <input
                  type="text"
                  name="username"
                  placeholder="Username..."
                  value={this.state.username}
                  onChange={this.handleUsernameChange}
                />
              <input
                  type="password"
                  name="password"
                  placeholder="Password..."
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                />
            </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
      );
    }
}



export default LogIn;
