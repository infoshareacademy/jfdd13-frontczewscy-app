import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import styles from "./Sidebar.module.css";

export default class SidebarSearch extends Component {
  state = {
    animation: "scale down",
    direction: "right",
    dimmed: false,
    visible: true,
    iconName: true
  };

  handleAnimationChange = animation => () =>
    this.setState(prevState => ({ animation, visible: !prevState.visible }));

  handleDirectionChange = direction => () =>
    this.setState({ direction, visible: false });

  render() {
    const { animation, dimmed, direction, visible } = this.state;
    const vertical = direction === "bottom" || direction === "top";

    const VerticalSidebar = props => (
      // { animation, direction, visible }
      <Sidebar
        as={Menu}
        animation={props.animation}
        direction={props.direction}
        icon="labeled"
        inverted
        vertical
        visible={props.visible}
        width="thin"
      >
        <Button
          className={styles.close}
          disabled={vertical}
          onClick={this.handleAnimationChange("scale down")}
        >
          <Icon name="x" size="large" />
        </Button>
        <Menu.Item as="a">Wyszukaj po nazwie</Menu.Item>
        <Menu.Item as="a">Kategorie</Menu.Item>
        <Menu.Item as="a">średnia cena</Menu.Item>
      </Sidebar>
    );

    VerticalSidebar.propTypes = {
      animation: PropTypes.string,
      direction: PropTypes.string,
      visible: PropTypes.bool
    };

    return (
      <div>
        <Sidebar.Pushable as={Segment} className={styles.sidebar}>
          <VerticalSidebar
            animation={animation}
            direction={direction}
            visible={visible}
          />
          <Button
            className={styles.btn}
            disabled={vertical}
            onClick={this.handleAnimationChange("scale down")}
          >
            <Icon name="bars" size="large" />
          </Button>

          <Sidebar.Pusher dimmed={dimmed && visible}>
            <Segment basic>{this.props.children}</Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
