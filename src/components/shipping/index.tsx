import ShippingForm from 'components/shippingForm';
import { IAppState } from 'interfaces/IAppState';
import { IStore } from 'interfaces/IStore';
import * as React from 'react';
import lifecycle from 'react-pure-lifecycle';
import { connect } from 'react-redux';

interface IProps {
  app: IStore;
}

const methods = {
  // tslint:disable-next-line:no-empty
  componentDidMount(props: IProps) {}
};

const Shipping = (props: IProps) => {
  const { totalPrice } = props.app;
  return (
    <div>
      <h1> Shipping Page</h1>
      <ShippingForm totalPrice={totalPrice} />
    </div>
  );
};

const mapStateToProps = (state: IAppState): object => {
  return {
    app: state.app
  };
};

export default connect(mapStateToProps)(lifecycle(methods)(Shipping));
