import React, { Fragment } from "react";
import { Card, Icon } from "semantic-ui-react";
import Sidebar from "./Sidebar";
import styles from "./Search.module.css";

const extra = (
  <a>
    <Icon name="user" />
    16 Friends
  </a>
);

const Item = () => {
  return (
    <Card
      image="/images/avatar/large/elliot.jpg"
      header="Elliot Baker"
      meta="Friend"
      description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
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
            <Item />
            <Item />
            <Item />
          </div>
        </div>
      </Sidebar>
    </Fragment>
  );
}

export default Search;
