import CartItem from 'components/cartItem';
import TotalPrice from 'components/totalPrice';
import { IAppState } from 'interfaces/IAppState';
import { ICartItem, ICartItems } from 'interfaces/ICart';
import { IDataAction } from 'interfaces/IGetData';
import { IStore } from 'interfaces/IStore';
import * as React from 'react';
import lifecycle from 'react-pure-lifecycle';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getDataAction } from 'store/actions';
import styles from './styles.css';

interface IProps {
  getData: () => Promise<IDataAction>;
  app: IStore;
}

const methods = {
  componentDidMount(props: IProps) {
    // tslint:disable-next-line:no-console
    console.log('I mounted! Here are my props: ', props);
    props.getData();
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

const Cart = (props: IProps) => {
  const { isFetching, dataRady } = props.app;

  // Cart Items
  const items = props.app.products;

  // Cart Total Price
  const totalPrice = getTotalPrice(items);

  // Render DOM Element
  let elDom: any = <div>Cart Page</div>;
  if (isFetching) {
    elDom = <div className={styles.appSpinner} />;
  }

  // Render Elements
  return dataRady ? (
    <div>
      <ul>
        {items.map((item: ICartItem, index: number) => (
          <li key={index}>
            <CartItem item={item} index={index} />
          </li>
        ))}
      </ul>
      <div>
        {totalPrice > 0 ? (
          <TotalPrice totalPrice={totalPrice} />
        ) : (
          <div>NO ITEMS</div>
        )}
      </div>
      <div className={styles.appLink}>
        {totalPrice > 0 ? <Link to="/shipping">BUY</Link> : ''}
      </div>
    </div>
  ) : (
    elDom
  );
};

const mapStateToProps = (state: IAppState): object => {
  return {
    app: state.app
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  getData: () => dispatch(getDataAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(lifecycle(methods)(Cart));
