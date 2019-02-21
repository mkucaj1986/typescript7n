import ChangeCart from 'components/changeCart';
import DeleteItem from 'components/deleteItem';
import { ICartItem } from 'interfaces/ICart';
import * as React from 'react';
import styles from './styles.css';

interface IProps {
  item: ICartItem;
  index: number;
}

const productTotalPrice = (product: ICartItem) => {
  return product.qty * product.price;
};

const CartItem = (props: IProps) => {
  const product: ICartItem = props.item;
  const index: number = props.index;

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemImg}>
        <img src={product.img} />
      </div>
      <div className={styles.cartItemText}>
        <div className={styles.cartItemTitle}>{product.title}</div>
        <div className={styles.cartItemSubtitle}>{product.subtitle}</div>
      </div>
      <div className={styles.cartItemDelete}>
        <DeleteItem index={index} />
      </div>
      <div className={styles.cartItemSelect}>
        <ChangeCart index={index} />
      </div>
      <div className={styles.cartItemPrice}>
        Product Price:{productTotalPrice(product)}
      </div>
    </div>
  );
};

export default CartItem;
