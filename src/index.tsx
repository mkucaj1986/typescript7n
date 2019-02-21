import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import configureStore, { history } from './configureStore';
import App from './containers/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// Setup Redux Store
const store = configureStore();

// Remder main app container
const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById('root') as HTMLElement
  );
};

render();

// Register pwa service worker
registerServiceWorker();

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept('./containers/App', () => {
    render();
  });
}
