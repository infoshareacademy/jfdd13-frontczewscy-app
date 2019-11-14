import React, { Fragment } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function Content(props) {
  return <div>{props.children}</div>;
}

function App() {
  return (
    <Fragment>
      <Navbar />
      <Sidebar />
      <Content>
        <h1>Frontczewscy App</h1>
      </Content>
    </Fragment>
  );
}

export default App;
