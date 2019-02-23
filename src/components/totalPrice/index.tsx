import { IAppState } from 'interfaces/IAppState';
import { ICartItem, ICartItems } from 'interfaces/ICart';
import { IStore } from 'interfaces/IStore';
import * as React from 'react';
import lifecycle from 'react-pure-lifecycle';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { setTotalPriceAction } from 'store/actions';
import styles from './styles.css';

interface IProps {
  totalPrice: number;
  app: IStore;
  setTotalPrice: (totalPrice: number) => any;
}

const methods = {
  async componentDidMount(props: IProps) {
    // Cart Items
    const items = props.app.products;

    // Cart Total Price
    const totalPrice: number = getTotalPrice(items);

    // Set Total Price
    props.setTotalPrice(totalPrice);
  }
};

const getTotalPrice = (items: ICartItems): number => {
  // Total Price number
  let totalPrice: number = 0;

  items.forEach((el: ICartItem) => {
    const price: number = el.qty * el.price;
    totalPrice += price;
  });

  // return total price
  return totalPrice;
};

const TotalPrice = (props: any) => {
  // Cart Items
  const items = props.app.products;

  // Cart Total Price
  const totalPrice: number = getTotalPrice(items);

  return (
    <div>
      <div className={styles.totalPrice}>Total Price:{totalPrice}</div>
    </div>
  );
};

const mapStateToProps = (state: IAppState): object => {
  return {
    app: state.app
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  setTotalPrice: (totalPrice: number) =>
    dispatch(setTotalPriceAction(totalPrice))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(lifecycle(methods)(TotalPrice));
