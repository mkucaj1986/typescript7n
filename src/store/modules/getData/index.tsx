import { IData, IDataAction } from 'interfaces/IGetData';
import { Redux } from 'react-redux';

/** Action Types */
export const GET_REQUEST: string = 'stars/GET_REQUEST';
export const GET_SUCCESS: string = 'stars/GET_SUCCESS';
export const GET_FAILURE: string = 'stars/GET_FAILURE';

// MOCK API
const dataUrl: string = 'http://www.mocky.io/v2/5c6e7c573400005500892ce8';

/** Initial State */
const initialState: IData = {
  isFetching: false
};

/** Reducer */
export function getData(state = initialState, action: IDataAction) {
  switch (action.type) {
    case GET_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });

    case GET_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        count: action.payload.count
      });

    case GET_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.payload.message,
        error: true
      });

    default:
      return state;
  }
}

/** Async Action Creator */
export function getDataAction() {
  return (dispatch: Redux.Dispatch) => {
    dispatch(dataRequest());

    return fetch(dataUrl)
      .then((response: Response) => {
        if (response.ok) {
          return response.json().then(res => dispatch(dataSuccess(res)));
        } else {
          return response.json().then(res => dispatch(dataFailure(res)));
        }
      })
      .catch(err => dispatch(dataFailure(err)));
  };
}

/** Action Creator */
export function dataRequest(): IDataAction {
  return {
    type: GET_REQUEST
  };
}

/** Action Creator */
export function dataSuccess(count: number): IDataAction {
  return {
    type: GET_SUCCESS,
    payload: {
      count
    }
  };
}

/** Action Creator */
export function dataFailure(message: any): IDataAction {
  return {
    type: GET_FAILURE,
    payload: {
      message
    }
  };
}
