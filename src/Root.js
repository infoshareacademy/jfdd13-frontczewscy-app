import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import App from "./App";
import Navbar from "./components/Navbar";
import UserDetails from "./components/UserDetails";
import TodoApp from "./components/TodoApp";
import PhotosApp from "./components/PhotosApp";

const Root = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact strict sensitive path="/" component={App} />
          <Route path="/todo-app" component={TodoApp} />
          <Route path="/photos-app" component={PhotosApp} />
          <Redirect exact from="/abc" to="/" />
          <Route exact path="/abc" component={() => <h1>/abc</h1>} />
          <Route exact path="/abc/" component={() => <h1>/abc/</h1>} />
          <Route exact path="/ABC/" component={() => <h1>/ABC/</h1>} />
          <Route exact path="/abc/def" component={() => <h1>ABC/DEF</h1>} />
          <Route path="/users/:id" component={UserDetails} />
          <Route
            path="/users/:id/:name"
            component={props => {
              const { id, name } = props.match.params;
              return (
                <h1>
                  Users {id} - {name}
                </h1>
              );
            }}
          />
          <Route component={() => <h1>404 - sadface</h1>} />
        </Switch>
        <h1>FOOTER</h1>
      </div>
    </Router>
  );
};

export default Root;
