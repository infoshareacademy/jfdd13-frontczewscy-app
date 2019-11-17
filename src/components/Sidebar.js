import PropTypes from "prop-types";
import React, { Component } from "react";
import { Form, Dropdown, Button, Icon, Menu, Segment, Sidebar, Input } from "semantic-ui-react";
import styles from "./Sidebar.module.css";

const options = [
  { key: 1, text: 'Imprezy', value: 1 },
  { key: 2, text: 'Puby', value: 2 },
  { key: 3, text: 'Wydarzenia', value: 3 },
]

const CategoryDropdown = () => (
  <Dropdown clearable options={options} selection />
)


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
        <Form>
          <Menu.Item as="a">Wyszukaj po nazwie
          <Input />
          </Menu.Item>
          <Menu.Item as="a">Kategorie
          <CategoryDropdown />
          </Menu.Item>
          <Menu.Item as="a">średnia cena</Menu.Item>
          <Button>Szukaj</Button>
        </Form>
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
