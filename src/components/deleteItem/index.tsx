import * as deleteBtn from 'assets/delete.png';
import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { removeItemAction } from 'store/actions';
import styles from './styles.css';

interface IProps {
  removeItem: (item: number) => Promise<any>;
  index: number;
}

const DeleteItem = (props: IProps) => {
  return (
    <div className={styles.deleteBtn}>
      <a onClick={() => deleteItem(props)}>
        <img src={deleteBtn} width="27" />
      </a>
    </div>
  );
};

const deleteItem = (props: IProps) => {
  props.removeItem(props.index);
};

const mapStateToProps = (state: any): object => {
  return {
    app: state.app
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  removeItem: (index: number) => dispatch(removeItemAction(index))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteItem);
