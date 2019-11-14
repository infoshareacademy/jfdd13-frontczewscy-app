import React, { Fragment } from "react";
import Sidebar from "./Sidebar";
import styles from "./Search.module.css";

function Search() {
  return (
    <Fragment>
      <Sidebar>
        <div className={styles.content}>
          <h1>Content of the search component</h1>
        </div>
      </Sidebar>
    </Fragment>
  );
}

export default Search;
