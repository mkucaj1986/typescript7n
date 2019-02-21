import * as React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { changeCartAction } from 'store/actions';
import styles from './styles.css';

interface IProps {
  index: number;
  changeCart: (option: any, item: number) => Promise<any>;
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

const handleChange = (option: any, props: IProps) => {
  props.changeCart(option.value, props.index);
};

const selectedOption: any = null;

const ChangeCart = (props: IProps) => {
  let options: any[] = [...Array(100).keys()];
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
  return {};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  changeCart: (option: any, index: number) =>
    dispatch(changeCartAction(option, index))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeCart);
