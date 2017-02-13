import React from 'react';
import styles from './Sorting.css';
import SortBtn from './SortBtn'

const buttonText = ['Popularity', 'Ratings', 'ABV', 'IBU']

const Sorting = (props) => {

	const buttons = buttonText.map((btn, i) => {
    return <SortBtn key={i} button={btn} 
      onClick={props.onClick}
      beers={props.beers} 
      sortBtn={props.sortBtn}
      sortState={props.sortState}
      ascending={props.ascending}/>
  });

  return ( 
    <div className={styles.wrapper}>
      {buttons}
    </div>
  );
           
};

export default Sorting;
