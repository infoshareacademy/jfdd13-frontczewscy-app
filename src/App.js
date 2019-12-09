import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";
import { useAuth } from "./hooks/useAuth";

import Navbar from "./components/Navbar";
import Search from "./screens/Search";
import Charts from "./screens/Charts";
import AddForm from "./screens/AddForm";
import Profile from "./screens/Profile";
import PartyDetails from "./screens/PartyDetails";
import Login from "./screens/Login";
import Reset from "./screens/Reset";
import Register from "./screens/Register";

const App = () => {
  const isLoggedIn = useAuth();

  if (isLoggedIn === null) {
    return (
      <Dimmer active={true} inverted>
        <Loader>Pobieranie danych...</Loader>
      </Dimmer>
    );
  }

  if (!isLoggedIn) {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/zaloguj" component={Login} />
            <Route exact path="/zarejestruj" component={Register} />
            <Route exact path="/zresetuj" component={Reset} />
            <Redirect to="/zaloguj" />
          </Switch>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact strict sensitive path="/" component={Charts} />
          <Route exact path="/dodaj-wydarzenie" component={AddForm} />
          <Route exact path="/wyszukaj" component={Search} />
          <Redirect exact path="/zaloguj" to="/" />
          <Redirect exact path="/zarejestruj" to="/" />
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
