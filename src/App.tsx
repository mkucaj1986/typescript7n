import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import './App.css';
import { AppProps } from './interfaces/AppProps';
import routes from './routes';

const App = ({ history }: AppProps) => {
  return <ConnectedRouter history={history}>{routes}</ConnectedRouter>;
};

export default App;
