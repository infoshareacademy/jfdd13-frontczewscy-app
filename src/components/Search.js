import React, { Component } from "react";
import { Button, Icon, Segment, Sidebar, Card } from "semantic-ui-react";

import styles from "./Search.module.css";
import "react-input-range/lib/css/index.css";
import { posts } from "./data";
import VerticalSidebar from "./VerticalSidebar";

const Item = props => {
  const { description, img, title } = props;

  return (
    <Card
      image={img}
      header={title}
      description={`${description.replace(/^(.{35}[^\s]*).*/, "$1")}...`}
    />
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
      sliderValue: null
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
                  {posts
                    .filter(post => post.title.includes(filter.title))
                    .map(post => (
                      <div key={post.id} className={styles.item}>
                        <Item
                          description={post.description}
                          img={post.img}
                          title={post.title}
                        />
                      </div>
                    ))}
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
