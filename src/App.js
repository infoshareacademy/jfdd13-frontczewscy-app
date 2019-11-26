import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Charts from "./components/Charts";
import AddForm from "./components/AddForm";
import Profile from "./components/Profile";
import PartyDetails from "./components/PartyDetails";
import Login from "./screens/Login";
import Register from "./screens/Register";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact strict sensitive path="/" component={Charts} />
          <Route exact path="/dodaj-wydarzenie" component={AddForm} />
          <Route exact path="/wyszukaj" component={Search} />
          <Route exact path="/zaloguj" component={Login} />
          <Route exact path="/zarejestruj" component={Register} />
          <Route exact path="/profil" component={Profile} />
          <Route exact path="/party/:id" component={PartyDetails} />
          <Route
            component={() => (
              <h1 className="pageNotFound">Przykro nam nie ma takiej strony</h1>
            )}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
