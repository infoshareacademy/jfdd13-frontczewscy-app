
import React from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { Icon } from 'semantic-ui-react';
import Logo from '../logoconcerte2.png'

 const Search = () => <Icon disabled name='search' />
 const Chart = () => <Icon disabled name='chart pie' />
 const AddEvent = () => <Icon disabled name='add' />
 const Profile = () => <Icon disabled name='user' />

 const Navbar = () => (
  <nav className={styles.navbar}>
      <div className={styles.left}><NavLink to="/" exact><img className={styles.logo} src = { Logo } /></NavLink></div>
      <ul className={styles.right}>
          <li><NavLink activeClassName={"active-link"} to="/wyszukaj"exact><Search />Wyszukiwanie imprez</NavLink></li>
          <li><NavLink to="/"exact><Chart />Wykresy</NavLink></li>
          <li><NavLink to="/dodaj-wydarzenie"exact><AddEvent />Dodaj wydarzenie</NavLink></li>
          <li><NavLink to="/profil"exact><Profile />Profil</NavLink></li>
      </ul>
      
    </nav>
  );

export default Navbar;
