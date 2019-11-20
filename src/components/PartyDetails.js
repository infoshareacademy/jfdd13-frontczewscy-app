import React from "react";

class PartyDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parties: [],
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
        <h1>Post title: {this.state.parties.title}</h1>
        <h2>Post adress: {this.state.parties.adress}</h2>
        <h2>Post description: {this.state.parties.description}</h2>
        <h2>Post image: {this.state.parties.image}</h2>
        <h2>Post partyType: {this.state.parties.partyType}</h2>
        <h2>Post phoneNumber: {this.state.parties.phoneNumber}</h2>
        <h2>Post price: {this.state.parties.price}</h2>
        <h2>Post website: {this.state.parties.website}</h2>
        <button onClick={console.log(this.state)}>X</button>
      </div>
    );
  }
}
export default PartyDetails;
