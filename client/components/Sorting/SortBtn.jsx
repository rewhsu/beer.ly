import React from 'react';
import styles from './Sorting.css';


const SortBtn = (props) => {  
  return ( 
    <div className={styles.wrapper}>
      {
        props.sortState === 0 || props.sortState % 3 === 0 ? <button onClick={props.onClick}>{props.button}</button> :
        props.sortBtn === props.button.slice(0, 3) ? 
        <button onClick={props.onClick}>{props.button + ' '}{props.ascending === 1 ? '▽' : props.ascending % 2 === 0 ? '△' : '▽'}</button> : 
        <button onClick={props.onClick}>{props.button}</button>
      }
    </div>
  )

};

export default SortBtn;

