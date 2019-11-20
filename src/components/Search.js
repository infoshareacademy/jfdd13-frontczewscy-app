import React, { Component } from "react";
import { Button, Icon, Segment, Sidebar, Card, Image } from "semantic-ui-react";

import styles from "./Search.module.css";
import "react-input-range/lib/css/index.css";
// import { posts } from "./data";
import VerticalSidebar from "./VerticalSidebar";

const Item = props => {
  const { description, img, title, date } = props;

  return (
    <Card>
      <Image src={img} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          <span className="date">{date}</span>
        </Card.Meta>
        <Card.Description>
          {`${description.replace(/^(.{35}[^\s]*).*/, "$1")}...`}
        </Card.Description>
      </Card.Content>
      {/* <Card.Content extra>
        <a>
          <Icon name="user" />
          22 Friends
        </a>
      </Card.Content> */}
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
    err: ""
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
      .catch(err => this.setState({ err: err.message }));
  };

  handleAnimationChange = animation => () =>
    this.setState(prevState => ({ animation, visible: !prevState.visible }));

  handleDirectionChange = direction => () =>
    this.setState({ direction, visible: false });

  handleOnSearch = values => {
    // console.log(values)
    console.log(this.state.parties, this.state.err);
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
