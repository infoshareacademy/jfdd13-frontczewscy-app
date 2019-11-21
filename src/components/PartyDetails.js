import React from "react";
import {List, Grid, Image, Header, Container, Rating} from "semantic-ui-react";
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
      website
    } = this.props.parties;
    const DescriptionContainer = () => (
      <Container textAlign='justified' style={{marginTop: '30px', width: '68%'} }>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
          ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
          magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
          ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
          quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
          arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
          Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras
          dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
          Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
          Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
          viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.
          Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
        </p>
      </Container>)
    const GridContainer = () => (
      <Grid >
        <Grid.Column width={4}>
          <Image src='https://react.semantic-ui.com/images/wireframe/image.png' style={{margin: '20px 0'}} />
        </Grid.Column>
        <Grid.Column width={9}>
        <List>
            <Header style={{textAlign:"center"}} size='huge'>{title}</Header>
            
            <List.Item>
             <List.Icon name='users'  size="large" color='violet'/>
             <List.Content>{title}</List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name='file text'  size="large" color='violet'/>
              <List.Content>{description}</List.Content>
            </List.Item>

            <List.Item>
            <List.Icon name='money'  size="large" color='violet'/>
              <List.Content>{price}</List.Content>

            </List.Item>

            <List.Item icon='marker' content={address}>


            </List.Item>

            <List.Item
              icon='mail'
              content="mail@brakujetugo.pl"
            ></List.Item>
            <List.Item
              icon='linkify'
              content={<a href={website}>{website}</a>}
            ></List.Item>
          </List>
          <Rating icon='heart' defaultRating={3} maxRating={10} />
        </Grid.Column>
    
      </Grid>
    )
    
    const MainList = () => (
      <List>
        <List.Item icon='users' content={title} >
      
        </List.Item>
        <List.Item icon='file text' content={description} />
        <List.Item icon='money' content={price} />
        <List.Item icon='marker' content={address} />
        <List.Item
          icon='mail'
          content="mail@brakujetugo.pl"
        />
        <List.Item
          icon='linkify'
          content={<a href={website}>{website}</a>}
        />
      </List>)
    return (
      <div className={styles.mainGrid}>
        <GridContainer className={styles.gridContainer}/>
        <DescriptionContainer className={styles.descriptionContainer}/>
      </div>
      // <div>
      //   <h1>Post title: {title}</h1>
      //   <h2>Post adress: {adress}</h2>
      //   <h2>Post description: {description}</h2>
      //   <h2>Post image: {image}</h2>
      //   <h2>Post partyType: {partyType}</h2>
      //   <h2>Post phoneNumber: {phoneNumber}</h2>
      //   <h2>Post price: {price}</h2>
      //   <h2>Post website: {website}</h2>
      //   <button onClick={console.log(this.props)}>X</button>
      // </div>
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
      <div>
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
