import React from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
const Login = () => {
  return   <Form>
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
