import * as React from 'react';
import styles from './styles.css';

interface IProps {
  totalPrice: number;
}

const TotalPrice = (props: IProps) => {
  return (
    <div>
      <div className={styles.totalPrice}>Total Price:{props.totalPrice}</div>
    </div>
  );
};

export default TotalPrice;
