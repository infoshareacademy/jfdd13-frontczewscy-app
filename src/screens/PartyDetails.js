import React from "react";
import { Image, Dimmer, Loader, Icon, Segment } from "semantic-ui-react";
import styles from "./PartyDetails.module.css";
import {
  handleFavoritesFirebase,
  getUserFavorites
} from "../services/UserService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faGlassCheers,
  faMoneyBillWave,
  faMapMarkerAlt,
  faAt,
  faLaptop,
  faClock
} from "@fortawesome/free-solid-svg-icons";
import firebase from "../firebase";

class FavoriteIcon extends React.Component {
  state = {
    isLoading: true,
    isFavorites: false,
    favorites: {}
  };

  componentDidMount = () => {
    getUserFavorites().then(favorites => {
      if (favorites) {
        const id = this.props.partyId;
        const isFavorites = favorites[id];
        this.setState({
          favorites,
          isFavorites
        });
      } else return null;
    });
  };

  handleFavorites = async () => {
    // this if statement change the state of favorites it creates more
    const id = this.props.partyId;

    const favorites = {
      ...this.state.favorites,
      [id]: this.state.favorites[id] ? null : true
    };

    this.setState({
      favorites,
      isFavorites: this.state.favorites[id] ? false : true
    });

    await handleFavoritesFirebase(id, firebase.auth().currentUser.uid);
    getUserFavorites().then(favorites => {
      this.setState({
        favorites: favorites || {}
      });
    });
  };

  render() {
    return (
      <Icon
        onClick={() => this.handleFavorites()}
        name={this.state.isFavorites ? "heart" : "heart outline"}
        size="large"
        className={styles.favoriteIcon}
      />
    );
  }
}

class Party extends React.Component {
  render() {
    const {
      date,
      hour,
      title,
      street,
      town,
      website,
      description,
      image,
      partyType,
      phoneNumber,
      price,
      email
    } = this.props.parties;
    console.log(this.props.parties);
    const GridContainer = () => (
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.imageContainer}>
            <Image
              className={styles.imageParty}
              src={
                image ||
                "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              }
              style={{
                margin: " 0 auto",
                zIndex: "10",
                border: "3px solid #f1f1f1"
              }}
            />
          </div>

          <div>
            <Image
              className={styles.imageParty}
              src={
                image ||
                "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              }
              style={{
                height: "100%",
                filter: "blur(8px)",
                position: "fixed",
                top: "40px",
                left: "0",
                border: "2px solid black",
                zIndex: "-10"
              }}
            />
          </div>
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.mainData}>
            <Segment style={{ fontWeight: "bold", width: "100%" }}>
              {" "}
              <FavoriteIcon
                partyId={this.props.id}
                className={styles.favoriteIcon}
              />
              {title}
            </Segment>
          </div>

          <div className={styles.mainData}>
            <Segment
              style={{ height: "100%", marginBottom: "0", width: "60px" }}>
              <FontAwesomeIcon icon={faClock} />
            </Segment>
            <Segment
              style={{ marginTop: "0", width: "100%", textAlign: "left" }}>
              {`${date}, ${hour}` || "Nie podano terminu"}
            </Segment>
          </div>

          <div className={styles.mainData}>
            <Segment
              style={{ height: "100%", marginBottom: "0", width: "60px" }}>
              <FontAwesomeIcon icon={faPhone} />
            </Segment>
            <Segment
              style={{ marginTop: "0", width: "100%", textAlign: "left" }}>
              KONTAKT: {phoneNumber || "XXX-XXX-XXX"}
            </Segment>
          </div>

          <div className={styles.mainData}>
            <Segment
              style={{
                height: "100%",
                marginBottom: "0",
                width: "60px",
                minHeight: "auto"
              }}>
              <FontAwesomeIcon icon={faGlassCheers} />
            </Segment>
            <Segment
              style={{ marginTop: "0", width: "100%", textAlign: "left" }}>
              {" "}
              Rodzaj imprezy: {partyType || "nie wybrano typu imprezy"}
            </Segment>
          </div>

          <div className={styles.mainData}>
            <Segment
              style={{
                height: "100%",
                marginBottom: "0",
                width: "60px",
                minHeight: "auto"
              }}>
              <FontAwesomeIcon icon={faMoneyBillWave} />
            </Segment>
            <Segment
              style={{ marginTop: "0", width: "100%", textAlign: "left" }}>
              {" "}
              Cena: {price || "nie podano ceny"}
            </Segment>
          </div>

          <div className={styles.mainData}>
            <Segment
              style={{ height: "100%", marginBottom: "0", width: "60px" }}>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </Segment>
            <Segment
              style={{ marginTop: "0", width: "100%", textAlign: "left" }}>
              Adres: {`${street}, ${town}` || "brak adresu"}
            </Segment>
          </div>

          <div className={styles.mainData}>
            <Segment
              style={{ height: "100%", marginBottom: "0", width: "60px" }}>
              <FontAwesomeIcon icon={faAt} />
            </Segment>
            <Segment
              style={{
                marginTop: "0",
                width: "100%",
                textAlign: "left",
                height: "100%"
              }}>
              E-mail: {email || "brak adresu email"}
            </Segment>
          </div>

          <div className={styles.mainData}>
            <Segment
              style={{ height: "100%", marginBottom: "0", width: "60px" }}>
              <FontAwesomeIcon icon={faLaptop} />
            </Segment>
            <Segment
              style={{ marginTop: "0", width: "100%", textAlign: "left" }}>
              Strona: {website || "nie podano adresu strony"}
            </Segment>
          </div>

          <div className={styles.mainData}>
            <Segment
              style={{
                marginTop: "0",
                width: "100%",
                height: "200px",
                textAlign: "left"
              }}>
              {description}
            </Segment>
          </div>
        </div>
      </div>
    );

    return (
      <div className={styles.mainGrid}>
        <GridContainer className={styles.gridContainer} />
      </div>
    );
  }
}

const SideLoader = props => (
  <Dimmer active={props.isLoading} inverted>
    <Loader>Pobieranie danych...</Loader>
  </Dimmer>
);

class PartyDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      parties: null,
      err: "",
      isLoading: true
    };
  }

  componentDidMount = () => {
    fetch(
      `https://frontczewscy-database.firebaseio.com/parties/${this.props.match.params.id}.json`
    )
      .then(resp => resp.json())
      .then(result => this.setState({ parties: result, isLoading: false }))
      .catch(err => this.setState({ err: err.message }));
  };

  render() {
    return (
      <div className={styles.container}>
        {this.state.parties ? (
          <Party parties={this.state.parties} id={this.props.match.params.id} />
        ) : (
          <div className={styles.noResult}>
            Przykro nam nie istnieje taka impreza, lub została usunięta :(
          </div>
        )}
        <SideLoader isLoading={this.state.isLoading} />
      </div>
    );
  }
}
export default PartyDetails;
