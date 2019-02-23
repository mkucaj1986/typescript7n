import { ICartItem, ICartItems } from 'interfaces/ICart';
import { IStore } from 'interfaces/IStore';
import * as React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { changeCartAction, setTotalPriceAction } from 'store/actions';
import styles from './styles.css';

interface IProps {
  index: number;
  app: IStore;
  changeCart: (option: any, item: number) => Promise<any>;
  setTotalPrice: (totalPrice: number) => any;
}

const colourStyles = {
  control: (controlStyles: any) => ({
    ...controlStyles,
    width: '150px',
    cursor: 'pointer',
    backgroundColor: 'white'
  }),
  option: (optionsStyles: any) => {
    return {
      ...optionsStyles,
      color: '#000'
    };
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

const handleChange = (option: any, props: IProps) => {
  props.changeCart(option.value, props.index);

  // Cart Items
  const items = props.app.products;

  // Cart Total Price
  const totalPrice: number = getTotalPrice(items);

  // Set Total Price
  props.setTotalPrice(totalPrice);
};

const selectedOption: any = null;

const ChangeCart = (props: IProps) => {
  // Select Range 0 - 100 pick item
  let options: any[] = [...Array(100).keys()];

  // fill array of select options
  options = options.map(el => {
    const o = Object.assign({}, el);
    o.value = el;
    o.label = el;
    return o;
  });

  return (
    <div className={styles.changeCart}>
      <Select
        value={selectedOption}
        onChange={e => handleChange(e, props)}
        styles={colourStyles}
        options={options}
      />
    </div>
  );
};

const mapStateToProps = (state: any): object => {
  return {
    app: state.app
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  changeCart: (option: any, index: number) =>
    dispatch(changeCartAction(option, index)),
  setTotalPrice: (totalPrice: number) =>
    dispatch(setTotalPriceAction(totalPrice))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeCart);
