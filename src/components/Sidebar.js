import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import styles from "./Sidebar.module.css";

const VerticalSidebar = ({ animation, direction, visible }) => (
  <Sidebar
    as={Menu}
    animation={animation}
    direction={direction}
    icon="labeled"
    inverted
    vertical
    visible={visible}
    width="thin">
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

export default class SidebarSearch extends Component {
  state = {
    animation: "overlay",
    direction: "right",
    dimmed: false,
    visible: false,
    iconName: true
  };

  handleAnimationChange = animation => () =>
    this.setState(prevState => ({ animation, visible: !prevState.visible }));

  handleDirectionChange = direction => () =>
    this.setState({ direction, visible: false });

  handleIconChange = () => {
    this.state.iconName
      ? this.setState({ iconName: false })
      : this.setState({ iconName: true });
  };

  render() {
    const { animation, dimmed, direction, visible } = this.state;
    const vertical = direction === "bottom" || direction === "top";
    const iconUse = this.state.iconName
      ? "arrow alternate circle left"
      : "arrow alternate circle right outline";
    return (
      <div>
        <Sidebar.Pushable as={Segment} className={styles.sidebar}>
          {vertical ? null : (
            <VerticalSidebar
              animation={animation}
              direction={direction}
              visible={visible}
            />
          )}

          <Sidebar.Pusher dimmed={dimmed && visible}>
            <Button
              className={styles.btn}
              disabled={vertical}
              onClick={this.handleAnimationChange("slide along")}>
              <Icon
                name={iconUse}
                onClick={this.handleIconChange}
                size="large"
              />
            </Button>
            <Segment basic>{this.props.children}</Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
