import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import createRootReducer from './store/reducers';
export const history = createBrowserHistory();

export default function configureStore(initialState?: any): Store<any> {
  const composeEnhancer: typeof compose =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancer(applyMiddleware(routerMiddleware(history), thunk))
  );

  // Hot reloading
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./store/reducers', () => {
      store.replaceReducer(createRootReducer(history));
    });
  }

  return store;
}
