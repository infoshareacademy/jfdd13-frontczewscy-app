import React from "react";

class Party extends React.Component {
  render() {
    const {
      title,
      adress,
      description,
      image,
      partyType,
      phoneNumber,
      price,
      website
    } = this.props.parties;

    return (
      <div>
        <h1>Post title: {title}</h1>
        <h2>Post adress: {adress}</h2>
        <h2>Post description: {description}</h2>
        <h2>Post image: {image}</h2>
        <h2>Post partyType: {partyType}</h2>
        <h2>Post phoneNumber: {phoneNumber}</h2>
        <h2>Post price: {price}</h2>
        <h2>Post website: {website}</h2>
        <button onClick={console.log(this.props)}>X</button>
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
