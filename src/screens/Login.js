import React from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import styles from "./Login.module.css";

const Login = () => {
  return   <Form className={styles.loginForm}>
  <Form.Field>
    <label>Login</label>
    <input placeholder='First Name' />
  </Form.Field>
  <Form.Field>
    <label>Hasło</label>
    <input type="password" placeholder='Last Name' />
  </Form.Field>
  <Button type='submit'>Submit</Button>
</Form>

};

export default Login;
