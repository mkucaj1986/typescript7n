import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import configureStore, { history } from './configureStore';
import App from './containers/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
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

registerServiceWorker();

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept('./containers/App', () => {
    render();
  });
}
