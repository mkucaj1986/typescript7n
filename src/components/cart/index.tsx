import CartItem from 'components/cartItem';
import TotalPrice from 'components/totalPrice';
import IAppState from 'interfaces/IAppState';
import { ICartItem } from 'interfaces/ICart';
import { IDataAction } from 'interfaces/IGetData';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getDataAction } from 'store/actions';
import styles from './styles.css';

interface IProps {
  getData: () => Promise<IDataAction>;
  appState: any;
  appProducts: any;
}

class Cart extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    this.props.getData();
  }

  getTotalPrice = (items: any): number => {
    let totalPrice: number = 0;
    items.forEach((el: ICartItem) => {
      const price: number = el.qty * el.price;
      totalPrice += price;
    });
    return totalPrice;
  };

  render() {
    const { isFetching, dataRady } = this.props.appState;

    // CartItems
    const items = this.props.appProducts;

    // Cart Total Price
    const totalPrice = this.getTotalPrice(items);

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
  }
}

const mapStateToProps = (state: IAppState): object => {
  return {
    appState: state.app,
    appProducts: state.app.products
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  getData: () => dispatch(getDataAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
