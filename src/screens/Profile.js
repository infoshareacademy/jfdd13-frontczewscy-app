import React, { useState, useEffect } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import styles from "./Profile.module.css";
import Item from "../components/Item";

import ImageUpload from "../components/ImageUpload"

import { getUserFavorites } from "../services/UserService";
import { watchParties } from "../services/PartiesService";

const Profile = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
        <h2 className={styles.favoritesHeader} style={{ margin: "10px" }}>Ulubione</h2>
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