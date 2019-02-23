import ChangeCart from 'components/changeCart';
import DeleteItem from 'components/deleteItem';
import { ICartItem } from 'interfaces/ICart';
import { IStore } from 'interfaces/IStore';
import * as React from 'react';
import styles from './styles.css';

interface IProps {
  item: ICartItem;
  index: number;
  app: IStore;
}

// Get product total price
const productTotalPrice = (product: ICartItem) => {
  return product.qty > 0 ? product.qty * product.price : product.price;
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
        <ChangeCart {...props} />
      </div>
      {product.qty > 0 ? (
        <div className={styles.cartItemQty}>Selected qty:{product.qty}</div>
      ) : (
        <div className={styles.cartItemQty}>Please Select Qty</div>
      )}
      <div className={styles.cartItemPrice}>
        Product Price:{productTotalPrice(product)}
      </div>
    </div>
  );
};

export default CartItem;
