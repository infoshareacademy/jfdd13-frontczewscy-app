import React from "react";
import {
  List,
  Grid,
  Image,
  Header,
  Container,
  Rating
} from "semantic-ui-react";
import styles from "./PartyDetails.module.css";


// const PartyDetails = () => (
//   <div className={styles.container}>
//           <div className={styles.content}>
//           <div className={styles.image_container}>
//               <Image src={"https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
//                   }/>    
//           </div>
//           <div className={styles.text_container}>
//             <h1>Nazwa wydarzenia</h1>
//             <div>
//                 <ul>
//                   <li>Organizator</li>
//                   <li>Telefon: XXX-XXX-XXX</li>
//                   <li>Kategoria wydarzenia</li>
//                   <li>Cena: </li>
//                   <li>Adres: </li>
//                   <li>E-mail: </li>
//                   <li>Link do strony wydarzenia</li>
//                   <li>Polubienia: </li>
//                 </ul>
//             </div>
//             <div>     
//               <p>Przykłądowy tekst opis wydarzenia super świetne wydarzenie 
//                 trele morele bab la bab koty są piękne a w ogóle to nie 
//                 wychodźcie z domu świat jest złym miejscem dobranoc.
//                 Przykłądowy tekst opis wydarzenia super świetne wydarzenie 
//                 trele morele bab la bab koty są piękne a w ogóle to nie 
//                 wychodźcie z domu świat jest złym miejscem dobranoc.</p>
//             </div> 
//           </div>
//     </div>
    
//   </div>
//   )

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
              <List.Content>{phoneNumber || "-"}</List.Content>
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

class PartyDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      parties: {},
      err: ""
    };
  }

  componentDidMount = () => {
    fetch(
      `https://frontczewscy-database.firebaseio.com/parties/${this.props.match.params.id}.json`
    )
      .then(resp => resp.json())
      .then(result => this.setState({ parties: result }))
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
      </div>
    );
  }
}
export default PartyDetails;
