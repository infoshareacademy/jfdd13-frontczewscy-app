import React, { Component } from "react";
import {
  Button,
  Icon,
  Segment,
  Sidebar,
  Dimmer,
  Loader,
  Pagination
} from "semantic-ui-react";
import styles from "./Search.module.css";
import "react-input-range/lib/css/index.css";
import VerticalSidebar from "../components/VerticalSidebar";
import { watchParties } from "../services/PartiesService";
import {
  handleFavoritesFirebase,
  getUserFavorites
} from "../services/UserService";
import firebase from "../firebase";
import Item from "../components/Item";

class SidebarSearch extends Component {
  state = {
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
    totalPages: 1,

    favorites: {},
    // not changing
    postPerPage: 8,
    animation: "scale down",
    direction: "right",
    dimmed: false,
    boundaryRange: 1,
    siblingRange: 1,
    showEllipsis: true,
    showFirstAndLastNav: true,
    showPreviousAndNextNav: true
  };

  componentDidMount = () => {
    watchParties(parties => {
      this.setState(
        {
          parties,
          loading: false
        },
        () => {
          this.handleTotalPages();
        }
      );
    });

    // const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    getUserFavorites().then(favorites => {
      this.setState({
        favorites: favorites || {}
      });
    });
  };

  get partiesAfterFilters() {
    const { favorites, filter } = this.state;
    return this.state.parties.filter(party => {
      return (
        party.title.toLowerCase().includes(filter.title.toLowerCase()) &&
        (filter.partyType !== "all"
          ? party.partyType.includes(filter.partyType)
          : true) &&
        parseFloat(party.price.replace(/,/g, ".")) <= filter.sliderValue &&
        (filter.isFavorites ? favorites[party.id] : true)
      );
    });
  }

  get partiesToShow() {
    const { postPerPage } = this.state;
    return this.partiesAfterFilters
      .reverse()
      .slice(
        this.state.activePage * postPerPage - postPerPage,
        this.state.activePage * postPerPage
      );
  }

  handleFavorites = async id => {
    // this if statement change the state of favorites it creates more
    const favorites = {
      ...this.state.favorites,
      [id]: this.state.favorites[id] ? null : true
    };

    this.setState({
      favorites
    });

    await handleFavoritesFirebase(id, firebase.auth().currentUser.uid);
    getUserFavorites().then(favorites => {
      this.setState({
        favorites: favorites || {}
      });
    });
  };

  handleAnimationChange = animation => () =>
    this.setState(prevState => ({ animation, visible: !prevState.visible }));

  handleDirectionChange = direction => () =>
    this.setState({ direction, visible: false });

  handleOnSearch = values => {
    this.setState(
      {
        filter: values
      },
      () => {
        this.handleTotalPages();
      }
    );
  };

  handleCheckboxChange = (e, { checked, name }) =>
    this.setState({ [name]: checked });

  handleInputChange = (e, { name, value }) => this.setState({ [name]: value });

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage });

  handleTotalPages = () => {
    const totalPages = Math.ceil(
      this.partiesAfterFilters.length / this.state.postPerPage
    );
    this.setState({ totalPages, activePage: 1 });
  };

  render() {
    const {
      animation,
      dimmed,
      direction,
      visible,
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

          <Sidebar.Pusher
            dimmed={dimmed && visible}
            style={{ transition: "0.5s", transform: "none !" }}
            className={styles.pusher}>
            <Segment basic>
              <Dimmer active={this.state.loading} inverted>
                <Loader>Pobieranie danych...</Loader>
              </Dimmer>
              <div className={styles.content}>
                <div className={styles.row}>
                  {this.partiesAfterFilters
                    .reverse()
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
                          partyType={post.partyType}
                          hour={post.hour}
                          favorites={favorites}
                          handleFavorites={this.handleFavorites}
                          showFavorites={true}
                        />
                      </div>
                    ))}
                  {this.partiesAfterFilters.length <= 0 &&
                  !this.state.loading ? (
                    <div className={styles.noSearch}>
                      <p>
                        Przykro nam, nie mamy imprezy dla Twoich wyszukiwań.
                      </p>
                    </div>
                  ) : null}
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
                    {this.partiesAfterFilters.length === 0 ? null : (
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
                    )}
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
