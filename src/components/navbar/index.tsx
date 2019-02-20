import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.css';

const NavBar = () => (
  <nav className={styles.appMenu}>
    <ul className={styles.appMenuList}>
      <li className={styles.appMenuListEl}>
        <NavLink
          to="/"
          exact={true}
          activeClassName={styles.appMenuIsActive}
          className={styles.appMenuLink}
        >
          Home
        </NavLink>
      </li>
      <li className={styles.appMenuListEl}>
        <NavLink
          to="/cart"
          className={styles.appMenuLink}
          activeClassName={styles.appMenuIsActive}
        >
          Cart
        </NavLink>
      </li>
      <li className={styles.appMenuListEl}>
        <NavLink
          to="/shipping"
          className={styles.appMenuLink}
          activeClassName={styles.appMenuIsActive}
        >
          Shipping
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default NavBar;
