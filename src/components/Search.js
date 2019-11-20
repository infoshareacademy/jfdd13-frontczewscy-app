import React, { Component } from "react";
import {
  Button,
  Icon,
  Segment,
  Sidebar,
  Card,
  Image,
  Dimmer,
  Loader
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import styles from "./Search.module.css";
import "react-input-range/lib/css/index.css";
// import { posts } from "./data";
import VerticalSidebar from "./VerticalSidebar";

const Item = props => {
  const { description, img, title, date, id } = props;

  return (
    <Card>
      <Image
        src={
          img ||
          "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        }
        wrapped
        ui={false}
      />

      <Card.Content>
        <Link className={styles.link} to={`/party/${id}`}>
          <Card.Header>{title}</Card.Header>
        </Link>
        <Card.Meta>
          <span className="date">{date}</span>
        </Card.Meta>
        <Card.Description>
          {`${description.replace(/^(.{35}[^\s]*).*/, "$1")}...`}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};
class SidebarSearch extends Component {
  state = {
    animation: "scale down",
    direction: "right",
    dimmed: false,
    visible: true,
    iconName: true,
    filter: {
      title: "",
      sliderValue: null,
      partyType: "all"
    },
    parties: [],
    err: "",
    loading: true
  };

  componentDidMount = () => {
    fetch(`https://frontczewscy-database.firebaseio.com/parties.json`)
      .then(resp => resp.json())
      .then(obj =>
        Object.keys(obj).map(key => {
          obj[key].id = key;
          return obj[key];
        })
      )
      .then(result => this.setState({ parties: result }))
      .then(data => this.setState({ loading: false }))
      .catch(err => this.setState({ err: err.message }));
    // .finally();
  };

  handleAnimationChange = animation => () =>
    this.setState(prevState => ({ animation, visible: !prevState.visible }));

  handleDirectionChange = direction => () =>
    this.setState({ direction, visible: false });

  handleOnSearch = values => {
    // console.log(values)
    console.log(this.state.parties, this.state.err);
    console.log(this.state.loading);
    this.setState({
      filter: values
    });
  };

  // .filter(
  //   post =>
  //     post.title.includes(filter.title) &&
  //     (filter.partyType === "all"
  //       ? true
  //       : post.categories.includes(filter.partyType))
  // )

  render() {
    const { animation, dimmed, direction, visible, filter } = this.state;
    const vertical = direction === "bottom" || direction === "top";

    return (
      <div>
        <Sidebar.Pushable as={Segment} className={styles.sidebar}>
          <VerticalSidebar
            onSearch={this.handleOnSearch}
            animation={animation}
            direction={direction}
            visible={visible}
            closeSidebar={this.handleAnimationChange}
          />
          <Button
            className={styles.btn}
            disabled={vertical}
            onClick={this.handleAnimationChange("scale down")}>
            <Icon name="bars" size="large" />
          </Button>

          <Sidebar.Pusher dimmed={dimmed && visible}>
            <Segment basic>
              <Dimmer active={this.state.loading} inverted>
                <Loader>Pobieranie danych</Loader>
              </Dimmer>
              <div className={styles.content}>
                <div className={styles.row}>
                  {this.state.parties
                    .filter(post => post.title.includes(filter.title))
                    .map(post => (
                      <div key={post.id} className={styles.item}>
                        <Item
                          description={post.description}
                          img={post.image}
                          title={post.title}
                          date={post.date}
                          id={post.id}
                        />
                      </div>
                    ))}
                  {this.state.err && (
                    <p style={{ color: "red" }}>{this.state.err}</p>
                  )}
                </div>
              </div>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

// address: "kielnieńska 128"
// date: "Nov 20th 19"
// description: "Fork from https://javascript.info/array"
// email: "mateusz.rostkowsky995@gmail.com"
// id: "-Lu7-qLy7YfNxr_WH-bx"
// image: "url.pl/jpg.jpg"
// partyType: "KONCERT"
// phoneNumber: "698888968"
// price: ""
// title: "Tytuł"
// website: "url.pl"

export default SidebarSearch;
