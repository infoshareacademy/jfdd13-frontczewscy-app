import React, { useState, useEffect } from "react";
import { Card, Image } from 'semantic-ui-react'
import styles from "./Profile.module.css";
import firebase from "../firebase"

import { watchUsers, stopUsers } from "../services/UserService";



const CardExampleImageCard = () => {
  const userId = firebase.auth().currentUser.uid;

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({})

  useEffect(() => {
    watchUsers(users => {
      setUsers(users);
      setUser(users.find(user => (
        userId === user.id
      )))
    });

    
    setUser(users.find(user => (
      userId === user.id
    )))

    return () => {
      stopUsers();
    };
  }, []);
  
  return(
    <div className={styles.container}>
    <Card className={styles.card}>
      <Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' wrapped ui={false} />
      <Card.Content>
        <Card.Header>Kajetan Kowalski</Card.Header>
        <Card.Meta>Joined in 2019</Card.Meta>
        <Card.Description>
            Nie będę się reklamował. 
            Nie lubię pisać o sobie, trzeba mnie poznać.
            Jestem miłym i normalnym facetem mającym swoje pasje.
            W polu „wymarzona partnerka” pustka.
            Nie ma ideałów...
            Jak znajdę to będę wiedział...
            Szukam kobiety, która mnie zrozumie.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div>
          <h2>User info</h2>
          {user && <div>
            <p>Display name: {user.name}</p>
            <p>Display bio: {user.bio}</p>
            <p>Display join date: {user.join}</p>
            <p>Display email: {user.email}</p>
            <p>Display gender: {user.gender}</p>
          </div>}
          
        </div>
      </Card.Content>
    </Card>
    </div>
  )}




  export default CardExampleImageCard