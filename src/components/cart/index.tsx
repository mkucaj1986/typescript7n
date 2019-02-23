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
  async componentDidMount(props: IProps) {
    try {
      await props.getData();
    } catch (error) {
      throw error;
    }
  }
};

const Cart = (props: IProps) => {
  const { isFetching, dataRady } = props.app;

  // Cart Items
  const items: ICartItems = props.app.products;

  // Allow shipping page
  const canShipping: boolean = props.app.totalPrice > 0 && items.length > 0;

  // Render DOM Element
  let elDom: any = (
    <div>
      <h1>Cart Page</h1>
      {props.app.errors}
    </div>
  );

  if (isFetching) {
    elDom = <div className={styles.appSpinner} />;
  }

  // Render Elements
  return dataRady ? (
    <div>
      <h1>Cart Page</h1>
      <ul>
        {items.map((item: ICartItem, index: number) => (
          <li key={index}>
            <CartItem item={item} index={index} app={props.app} />
          </li>
        ))}
      </ul>
      <div>{items.length ? <TotalPrice {...props} /> : <h2>NO ITEMS</h2>}</div>
      <div className={styles.appLink}>
        {canShipping ? <Link to="/shipping">BUY</Link> : ''}
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
