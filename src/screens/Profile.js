import React, { useState, useEffect } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import styles from "./Profile.module.css";
import Item from "../components/Item";

import ImageUpload from "../components/ImageUpload"

import { watchUser, getUserFavorites } from "../services/UserService";
import { watchParties } from "../services/PartiesService";

const Profile = () => {
  const [user, setUser] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    watchUser().then(user => {
      setUser(user);
    });

    getUserFavorites().then(favorites => {
      watchParties(parties => {
        const newFavorites = parties.filter(party => {
          if (favorites) return favorites[party.id];
          else return null;
        });

        setFavorites(newFavorites);

        setIsLoading(false);
      });
    });
  }, []);

  return (
    <div className={styles.container}>
      <Dimmer active={isLoading} inverted>
        <Loader>Pobieranie danych...</Loader>
      </Dimmer>
      <ImageUpload/>
      <div className={styles.userInfo}>
        <h2 className={styles.favoritesHeader}>Ulubione</h2>
        <div className={styles.userFavorites}>
          {favorites.map(post => {
            return (
              <div
                key={post.id}
                className={styles.item}
                style={{ margin: "10px", width: "290px" }}>
                <Item
                  description={post.description}
                  img={post.image}
                  title={post.title}
                  date={post.date}
                  id={post.id}
                  price={post.price}
                  partyType={post.partyType}
                  hour={post.hour}
                  favorites={favorites}
                  showFavorites={false}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;


// <div className={styles.userInfo}>
//         <div className={styles.userDetails}>
//           <img
//             height="250px"
//             style={{ margin: "20px 0 0 0" }}
//             src={
//               user.img ||
//               "https://react.semantic-ui.com/images/avatar/large/matthew.png"
//             }
//             alt="user profile"
//           />
//           <h1>{user.name}</h1>
//           <p>{user.bio}</p>
//           <p>Data dołączenia {user.joined}</p>
//           <p>Adres email {user.email}</p>
//         </div>