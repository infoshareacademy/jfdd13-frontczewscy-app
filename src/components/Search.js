import React, { Fragment } from "react";
import { Card, Icon } from "semantic-ui-react";
import Sidebar from "./Sidebar";
import styles from "./Search.module.css";
import { posts } from "./data";

const extra = (
  <div>
    <Icon name="user" />
    16 Friends
  </div>
);

const Item = props => {
  const { description, img, title } = props;

  return (
    <Card
      image={img}
      header={title}
      meta="Friend"
      description={`${description.replace(/^(.{35}[^\s]*).*/, "$1")}...`}
      extra={extra}
    />
  );
};

function Search() {
  return (
    <Fragment>
      <Sidebar>
        <div className={styles.content}>
          <div className={styles.row}>
            {posts.map(post => (
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
      </Sidebar>
    </Fragment>
  );
}

export default Search;
