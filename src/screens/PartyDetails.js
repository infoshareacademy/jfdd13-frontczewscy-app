import React from "react";
import {
  List,
  Grid,
  Image,
  Header,
  Container,
  Rating,
  Dimmer,
  Loader
} from "semantic-ui-react";
import styles from "./PartyDetails.module.css";

class Party extends React.Component {
  render() {
    const {
      title,
      address,
      description,
      image,
      partyType,
      phoneNumber,
      price,
      email
    } = this.props.parties;
    const DescriptionContainer = () => (
      <Container textAlign="justified">
        <p>{description}</p>
      </Container>
    );
    const GridContainer = () => (
      <Grid centered>
        <Grid.Column width={6}>
          <Image
            src={
              image ||
              "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            }
            style={{ margin: "20px 0px" }}
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <List>
            <Header size="huge">{title}</Header>

            <List.Item>
              <List.Icon name="users" size="large" color="violet" />
              <List.Content>{title}</List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name="phone square" size="large" color="violet" />
              <List.Content>{phoneNumber || "XXX-XXX-XXX"}</List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name="check" size="large" color="violet" />
              <List.Content>
                {partyType || "nie wybrano typu imprezy"}
              </List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name="money" size="large" color="violet" />
              <List.Content>{price || "nie podano ceny"}</List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name="marker" size="large" color="violet" />
              <List.Content>{address || "brak adresu"}</List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name="mail" size="large" color="violet" />
              <List.Content>{email || "brak adresu email"}</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="linkify" size="large" color="violet" />
              <List.Content>{0 || "nie podano adresu strony"}</List.Content>
            </List.Item>
          </List>
          <Rating icon="heart" defaultRating={10} maxRating={10} />
        </Grid.Column>
      </Grid>
    );

    return (
      <div className={styles.mainGrid}>
        <GridContainer className={styles.gridContainer} />
        <DescriptionContainer className={styles.descriptionContainer} />
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
          <Party parties={this.state.parties} />
        ) : (
          <div>Przykro nam nie ma takiego czegoś</div>
        )}
        <SideLoader isLoading={this.state.isLoading} />
      </div>
    );
  }
}
export default PartyDetails;
