import Home from 'components/home';
import NavBar from 'components/navbar';
import NotFound from 'components/notfound';
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router';
import styles from './styles.css';

const Cart = React.lazy(() => import('../components/cart'));
const Shipping = React.lazy(() => import('../components/shipping'));

const routes = (
  <div className={styles.appWrapper}>
    <NavBar />
    <div className={styles.appContainer}>
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route
          path="/cart"
          render={props => (
            <Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </Suspense>
          )}
        />
        <Route
          path="/shipping"
          render={props => (
            <Suspense fallback={<div>Loading...</div>}>
              <Shipping />
            </Suspense>
          )}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  </div>
);

export default routes;
