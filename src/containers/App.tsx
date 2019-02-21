import { ConnectedRouter } from 'connected-react-router';
import { AppProps } from 'interfaces/AppProps';
import * as React from 'react';
import routes from '../routes';
import './App.css';

// Main App container
const App = ({ history }: AppProps) => {
  return <ConnectedRouter history={history}>{routes}</ConnectedRouter>;
};

export default App;
