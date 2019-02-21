import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { ICartItem } from 'interfaces/ICart';
import { IStore } from 'interfaces/IStore';
import { combineReducers } from 'redux';

/** Initial State */
const initialState: IStore = {
  products: [],
  dataRady: false,
  isFetching: false
};

const AppReducer = (state: IStore = initialState, action: any) => {
  switch (action.type) {
    case 'DATA_STARTED':
      state = Object.assign({}, state, action.payload);
      return state;
    case 'DATA_SUCCESS':
      state = Object.assign({}, state, action.payload);
      return state;
    case 'DELETE_ITEM':
      state = deleteItem(state, action);
      return state;
    case 'CHNAGE_CART':
      state = changeCart(state, action);
      return state;
    default:
      return state;
  }
};

const deleteItem = (state: IStore, action: any) => {
  const { products } = state;
  const newProducts = products.filter(
    (x: any, index: number) => index !== action.payload
  );
  state = {
    ...state,
    products: newProducts
  };
  return state;
};

const changeCart = (state: IStore, action: any) => {
  const { products } = state;
  const { option } = action.payload;
  const idx: number = action.payload.index;
  const newProducts = products.map((element: ICartItem, index: number) => {
    element.qty = idx === index ? option : element.qty;
    return element;
  });
  state = {
    ...state,
    products: newProducts
  };
  return state;
};

const rootReducer = (history: History) =>
  combineReducers({
    app: AppReducer,
    router: connectRouter(history)
  });

export default rootReducer;
