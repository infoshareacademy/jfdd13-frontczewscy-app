import React from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import styles from "./Register.module.css"

const Register = () => {
  return  <Form >
  <Form.Field >
    <label>E-mail</label>
    <input placeholder='E-mail' />
  </Form.Field>
  <Form.Field >
    <label>Name</label>
    <input placeholder='Name' />
  </Form.Field>
  <Form.Field >
    <label>Hasło</label>
    <input type="password" placeholder='Hasło' />
  </Form.Field>
  <Form.Field>
    <label>Powtórz hasło</label>
    <input type="password" placeholder='Powtórz hasło' />
  </Form.Field>
  <Form.Field>
    <label>Bio</label>
    <input type="text" placeholder='Bio' />
  </Form.Field>
  <Button type='submit'>Submit</Button>
</Form>
};

export default Register;
