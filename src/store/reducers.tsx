import { IStore } from 'interfaces/IStore';
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer } from 'redux-connect';
import { getData } from './modules/getData';

const rootReducer: Redux.Reducer<IStore> = combineReducers<IStore>({
  routing: routerReducer,
  getData,
  reduxAsyncConnect: reducer
});

export default rootReducer;
