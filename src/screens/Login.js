import React, { useState } from "react";
import { Link }  from "react-router-dom"
import { Button, Form, Divider, Grid, Segment } from "semantic-ui-react";
import styles from "./Login.module.css";
import { login } from "../services/AuthService";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Segment placeholder>
      <Grid columns={2} relaxed="very" stackable>
        <Grid.Column>
          <Form className={styles.loginForm}>
            <Form.Field className={styles.loginFormLogin}>
              <label>Email</label>
              <input
                placeholder="First Name"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </Form.Field>
            <Form.Field className={styles.loginFormPassword}>
              <label>Hasło</label>
              <input
                type="password"
                placeholder="Last Name"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </Form.Field>
            <Button type="submit" onClick={() => login(email, password)}>
              Zaloguj się
            </Button>
          </Form>
        </Grid.Column>

        <Grid.Column verticalAlign="middle">
          <p style={{textAlign: "center", fontWeight: "bold"}}>Jeżeli nie masz jeszcze konta</p>
          <Link to="/zarejestruj"><Button content="Zarejestruj się" icon="signup" size="big" /></Link>
        </Grid.Column>
      </Grid>

      <Divider vertical>Lub</Divider>
    </Segment>
  );
};

export default Login;
