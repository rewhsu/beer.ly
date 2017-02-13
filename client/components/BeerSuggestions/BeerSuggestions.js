import React from 'react';
import styles from './BeerSuggestions.css';
import BeerSuggestion from './../BeerSuggestion/BeerSuggestion.js'

class BeerSuggestions extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.grid}>
        <div className={styles.type}>
          <h3>Similar Beers</h3>
            {console.log(this.props)}
            <div className={styles.suggestionWidth}>
              {this.props.suggestions.items.map((suggestion) =>
                <BeerSuggestion suggestion={suggestion} />
              )}
          </div>
        </div>
        <h4>User Reviews</h4>
      </div>
    );
  }
}

BeerSuggestions.propTypes = {
  suggestions: React.PropTypes.object.isRequired,
};

export default BeerSuggestions;
