import React from "react";
import { Button, Form, Message } from "semantic-ui-react";
import styles from "./Register.module.css"

const Register = () => {
  return  <Form className={styles.registerForm}>
    <Message size="small" className={styles.registerFormMessage}
    icon='add user'
    header='Witaj w formularzu rejestracji.'
    content='Wypełnij wszystkie pola, kliknij zatwierdź aby zakończyć rejestrację.'
  />
  
  <Form.Field required className={styles.registerFormEmail}>
    <label>E-mail</label>
    <input placeholder='E-mail' />
  </Form.Field>
  <Form.Field required className={styles.registerFormName}>
    <label>Name</label>
    <input placeholder='Name' />
  </Form.Field>
  <Form.Field required className={styles.registerFormPass}>
    <label>Hasło</label>
    <input type="password" placeholder='Hasło' />
  </Form.Field>
  <Form.Field required className={styles.registerFormPassRep}>
    <label>Powtórz hasło</label>
    <input type="password" placeholder='Powtórz hasło' />
  </Form.Field>
  <Form.Field className={styles.registerFormImage}>
    <label>Zdjęcie profilowe</label>
    <input placeholder='Zdjęcie profilowe' />
  </Form.Field>
  <Form.Field className={styles.registerFormSelect}>
    <label>Płeć</label>
    <select>
      <option>Mężczyzna</option>
      <option>Kobieta</option>
      <option>Nie chcę podawać</option>
    </select>
  </Form.Field>
  <Form.Field  className={styles.registerFormBio}>
    <label>Bio</label>
    <textarea placeholder="Bio"  style={{minHeight:"200px"}} rows="3"></textarea>
  </Form.Field>
  <Button type='submit'>Zarejestruj</Button>
</Form>
};

export default Register;
