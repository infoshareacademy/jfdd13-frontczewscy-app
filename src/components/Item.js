import React, { Component } from "react";
import {
  Icon,
  Card,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import styles from "../screens/Search.module.css";

const Item = props => {
    const {
      description,
      img,
      title,
      date,
      id,
      price,
      favorites,
      handleFavorites,
      partyType,
      hour
    } = props;
  
    return (
      <Card className={styles.inside}>
        <Link to={`/party/${id}`}>
          <img
            src={
              img ||
              "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            }
            style={{
              height: "300px",
              objectFit: "cover",
              objectPosition: "center",
              width: "100%"
            }}
            alt={title}
          />
        </Link>
  
        <Card.Content>
          <Link className={styles.link} to={`/party/${id}`}>
            <Card.Header>
              {title} {price ? ` || ${parseInt(price, 10)} zł` : null}
            </Card.Header>
          </Link>
          <Card.Meta>
            <span className="date">
              {date || ""} {hour ? ` at ${hour}` : null}
            </span>
          </Card.Meta>
          <Card.Description style={{ wordWrap: "break-word", height: "60px" }}>
            {`${description.replace(/^(.{35}[^\s]*).*/, "$1")}...`}
          </Card.Description>
          <Card.Content
            extra
            style={{ display: "flex", justifyContent: "space-between" }}>
            <Icon
              onClick={() => handleFavorites(id)}
              name={favorites.includes(id) ? "heart" : "heart outline"}
              size="large"
              className={styles.favoriteIcon}
            />
            <span>
              {partyType}
            </span>
          </Card.Content>
        </Card.Content>
      </Card>
    );
  };

  export default Item;
  