import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Charts from "./components/Charts";
import AddForm from "./components/AddForm";
import Profile from "./components/Profile";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact strict sensitive path="/" component={Charts} />
          <Route exact path="/dodaj-wydarzenie" component={AddForm} />
          <Route exact path="/wyszukaj" component={Search} />
          <Route exact path="/profil" component={Profile} />
          <Route component={() => <h1>404 - Przykro nam nie ma takiej strony</h1>} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
