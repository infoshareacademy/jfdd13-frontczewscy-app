import React, { Component } from "react";
import {
  Button,
  Icon,
  Segment,
  Sidebar,
  Card,
  Dimmer,
  Loader,
  Pagination
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import styles from "./Search.module.css";
import "react-input-range/lib/css/index.css";
import VerticalSidebar from "./VerticalSidebar";
import _ from "lodash";

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
    <Card>
      <img
        src={
          img ||
          "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        }
        style={{
          height: "300px",
          objectFit: "cover",
          objectPosition: "center"
        }}
        alt={title}
      />

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
          <span>{partyType}</span>
        </Card.Content>
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
      sliderValue: 500,
      partyType: "all"
    },
    page: 1,
    parties: [],
    err: "",
    loading: true,
    activePage: 1,
    boundaryRange: 1,
    siblingRange: 1,
    showEllipsis: true,
    showFirstAndLastNav: true,
    showPreviousAndNextNav: true,
    totalPages: 3,
    postPerPage: 12,
    favorites: []
  };

  handleTotalPages = () => {
    const newTotalPages = Math.ceil(
      this.state.parties.length / this.state.postPerPage
    );
    this.setState({ totalPages: newTotalPages });
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
      .then(data => {
        this.setState({ loading: false });
        this.handleTotalPages();
      })
      .catch(err => this.setState({ err: err.message }));

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    this.setState({
      favorites
    });
  };

  componentDidUpdate() {
    localStorage.setItem("favorites", JSON.stringify(this.state.favorites));
  }

  handleFavorites = id => {
    if (this.state.favorites.includes(id)) {
      const favorites = [...this.state.favorites];
      _.pull(favorites, id);

      this.setState({
        favorites
      });
    } else {
      const favorites = [...this.state.favorites, id];

      this.setState({
        favorites
      });
    }
  };

  handleAnimationChange = animation => () =>
    this.setState(prevState => ({ animation, visible: !prevState.visible }));

  handleDirectionChange = direction => () =>
    this.setState({ direction, visible: false });

  handleOnSearch = values => {
    this.setState({
      filter: values
    });
  };

  handleCheckboxChange = (e, { checked, name }) =>
    this.setState({ [name]: checked });

  handleInputChange = (e, { name, value }) => this.setState({ [name]: value });

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage });

  render() {
    const {
      animation,
      dimmed,
      direction,
      visible,
      filter,
      activePage,
      boundaryRange,
      siblingRange,
      showEllipsis,
      showFirstAndLastNav,
      showPreviousAndNextNav,
      totalPages,
      postPerPage,
      favorites
    } = this.state;

    return (
      <div>
        <Sidebar.Pushable
          as={Segment}
          style={{ margin: `0 -2px -3px -2px`, border: "none" }}>
          <VerticalSidebar
            onSearch={this.handleOnSearch}
            animation={animation}
            direction={direction}
            visible={visible}
            closeSidebar={this.handleAnimationChange}
          />
          <Button
            className={styles.btn}
            onClick={this.handleAnimationChange("scale down")}>
            <Icon name="bars" size="large" />
          </Button>

          <Sidebar.Pusher dimmed={dimmed && visible}>
            <Segment basic>
              <Dimmer active={this.state.loading} inverted>
                <Loader>Pobieranie danych...</Loader>
              </Dimmer>
              <div className={styles.content}>
                <div className={styles.row}>
                  {this.state.parties
                    .filter(
                      post =>
                        post.title
                          .toLowerCase()
                          .includes(filter.title.toLowerCase()) &&
                        (filter.partyType !== "all"
                          ? post.partyType.includes(filter.partyType)
                          : true) &&
                        parseFloat(post.price.replace(/,/g, ".")) <=
                          filter.sliderValue &&
                        (filter.isFavorites
                          ? favorites.includes(post.id)
                          : true)
                    )
                    .slice(
                      this.state.activePage * postPerPage - postPerPage,
                      this.state.activePage * postPerPage
                    )
                    .map(post => (
                      <div key={post.id} className={styles.item}>
                        <Item
                          description={post.description}
                          img={post.image}
                          title={post.title}
                          date={post.date}
                          id={post.id}
                          price={post.price}
                          favorites={favorites}
                          handleFavorites={this.handleFavorites}
                          partyType={post.partyType}
                          hour={post.hour}
                        />
                      </div>
                    ))}
                  {this.state.err && (
                    <p style={{ color: "red" }}>{this.state.err}</p>
                  )}
                  <div
                    style={{
                      marginBottom: "40px",
                      display: "flex",
                      justifyContent: "center",
                      width: "100%"
                    }}>
                    <Pagination
                      activePage={activePage}
                      boundaryRange={boundaryRange}
                      onPageChange={this.handlePaginationChange}
                      size="large"
                      siblingRange={siblingRange}
                      totalPages={totalPages}
                      ellipsisItem={showEllipsis ? undefined : null}
                      firstItem={showFirstAndLastNav ? undefined : null}
                      lastItem={showFirstAndLastNav ? undefined : null}
                      prevItem={showPreviousAndNextNav ? undefined : null}
                      nextItem={showPreviousAndNextNav ? undefined : null}
                    />
                  </div>
                </div>
              </div>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default SidebarSearch;
