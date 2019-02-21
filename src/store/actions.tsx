import axios, { AxiosResponse } from 'axios';
import { IDataAction } from 'interfaces/IGetData';
import { Dispatch } from 'redux';
import {
  CHNAGE_CART,
  DATA_FAILURE,
  DATA_STARTED,
  DATA_SUCCESS,
  DELETE_ITEM
} from './types';

// MOCK API
const baseURL: string = 'http://www.mocky.io/v2/5c6fcdf83800006e003fc9b8';

export const removeItemAction = (index: number) => {
  return (dispatch: Dispatch) => {
    dispatch(removeItem(index));
  };
};

export const changeCartAction = (option: any, index: number) => {
  return (dispatch: Dispatch) => {
    dispatch(changeCart(option, index));
  };
};

export const getDataAction = () => {
  return (dispatch: Dispatch) => {
    dispatch(dataStarted());
    axios
      .get(baseURL)
      .then((res: AxiosResponse) => {
        dispatch(dataSuccess(res.data));
      })
      .catch((err: any) => {
        dispatch(dataFailure(err.message));
      });
  };
};

const removeItem = (index: number): any => ({
  type: DELETE_ITEM,
  payload: index
});

const changeCart = (option: any, index: number): any => ({
  type: CHNAGE_CART,
  payload: { option, index }
});

const dataStarted = (): IDataAction => ({
  type: DATA_STARTED,
  payload: { isFetching: true }
});

const dataSuccess = (products: any): any => ({
  type: DATA_SUCCESS,
  payload: {
    isFetching: false,
    dataRady: true,
    products: products.items
  }
});

const dataFailure = (errors: any): IDataAction => ({
  type: DATA_FAILURE,
  payload: {
    isFetching: false,
    dataRady: false,
    errors
  }
});
