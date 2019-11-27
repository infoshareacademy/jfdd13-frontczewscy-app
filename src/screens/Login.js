import React, { useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import styles from "./Login.module.css";
import { login } from "../services/AuthService";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
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
        Submit
      </Button>
    </Form>
  );
};

export default Login;
