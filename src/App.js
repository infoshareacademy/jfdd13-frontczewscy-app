import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Search from "./screens/Search";
import Charts from "./screens/Charts";
import AddForm from "./screens/AddForm";
import Profile from "./screens/Profile";
import PartyDetails from "./screens/PartyDetails";
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
