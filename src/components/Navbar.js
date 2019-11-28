
import React from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { Icon } from 'semantic-ui-react';
import Logo from '../logoconcerte2.png'
import firebase from "../firebase";

 const Search = () => <Icon disabled name='search' />
 const Chart = () => <Icon disabled name='chart pie' />
 const AddEvent = () => <Icon disabled name='add' />
 const Profile = () => <Icon disabled name='user' />
 const SignOut = () => <Icon disabled name='sign-out' />

 const Navbar = () => (
  <nav className={styles.navbar}>
      <div className={styles.left}>
        <NavLink to="/" exact className={styles.navLogo}>
          <img className={styles.logo} src = { Logo } alt="Concerte Logo" />
          <span>Concerte</span>
        </NavLink>
      </div>
      <ul className={styles.right}>
          <li><NavLink activeClassName={"active-link"} to="/wyszukaj"exact><Search />Wyszukiwanie imprez</NavLink></li>
          <li><NavLink activeClassName={"active-link"} to="/"exact><Chart />Wykresy</NavLink></li>
          <li><NavLink activeClassName={"active-link"} to="/dodaj-wydarzenie"exact><AddEvent />Dodaj wydarzenie</NavLink></li>
          <li><NavLink activeClassName={"active-link"} to="/profil"exact><Profile />Profil</NavLink></li>
          <li onClick={() => firebase.auth().signOut()}><a href="#"><SignOut />Wyloguj</a></li>
      </ul>
      
    </nav>
  );

export default Navbar;
