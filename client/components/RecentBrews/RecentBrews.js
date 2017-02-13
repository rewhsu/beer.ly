import React from 'react';
import styles from './RecentBrews.css';
import RecentBrew from './../RecentBrew/RecentBrew.js'

class RecentBrews extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.grid}>
        <div className={styles.type}>
          <h3>Recent Brews</h3>
          <div className={styles.preScrollableFixed}>
            <div className={styles.recentBrewsWidth}>
              {this.props.recentBrews.items.map((brew, i) =>
                <RecentBrew beer={brew} key={i}/>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RecentBrews.propTypes = {
  recentBrews: React.PropTypes.object.isRequired,
};

export default RecentBrews;
