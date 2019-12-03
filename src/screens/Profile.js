import React, { useState, useEffect } from "react";
import { Card, Image, Dimmer, Loader } from "semantic-ui-react";
import styles from "./Profile.module.css";

import { watchUser } from "../services/UserService";
import { watchParties } from "../services/PartiesService";

const Profile = () => {
  const [user, setUser] = useState({});
  const [parties, setParties] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    watchUser().then(user => {
      setUser(user);
      watchParties(parties => {
        console.log(user.favorites);
        const newParties = parties.filter(party => {
          return user.favorites.includes(party.id);
        });
        console.log(newParties);
        setParties(newParties);
      });
      setIsLoading(false);
    });
  }, []);

  return (
    <div className={styles.container}>
      <Dimmer active={isLoading} inverted>
        <Loader>Pobieranie danych...</Loader>
      </Dimmer>
      <div style={{ width: "100%", maxWidth: "1200px", display: "flex" }}>
        <div style={{ flex: 2 }}>
          <img
            height="150px"
            style={{ margin: "20px 0 0 0" }}
            src={
              user.img ||
              "https://react.semantic-ui.com/images/avatar/large/matthew.png"
            }
            alt="user profile"
          />
          <h1 onClick={() => console.log(parties)}>{user.name}</h1>
          <p>{user.bio}</p>
          <p>Data dołączenia {user.joined}</p>
          <p>Adres email {user.email}</p>
        </div>
        <div style={{ flex: 1, background: "lightblue", minHeight: "100vh" }}>
          Favorites
        </div>
      </div>
    </div>
  );
};

export default Profile;

{
  /* <Card className={styles.card}>
        <Image
          src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header>Kajetan Kowalski</Card.Header>
          <Card.Meta>Joined in 2019</Card.Meta>
          <Card.Description>
            Nie będę się reklamował. Nie lubię pisać o sobie, trzeba mnie
            poznać. Jestem miłym i normalnym facetem mającym swoje pasje. W polu
            „wymarzona partnerka” pustka. Nie ma ideałów... Jak znajdę to będę
            wiedział... Szukam kobiety, która mnie zrozumie.
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div>
            <h2
              onClick={() => {
                console.log(user);
              }}>
              User info
            </h2>

            <div>
              <p>Display name: {user.name}</p>
              <p>Display bio: {user.bio}</p>
              <p>Display join date: {user.joined}</p>
              <p>Display email: {user.email}</p>
            </div>
          </div>
        </Card.Content>
      </Card> */
}
