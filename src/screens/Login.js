import React, { useState } from "react";
import { Link }  from "react-router-dom"
import { Button, Form, Divider, Grid, Segment } from "semantic-ui-react";
import styles from "./Login.module.css";
import { login } from "../services/AuthService";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Segment placeholder style={{height:"100vh"}}>
     <div className={styles.loginBody}>
        <div className={styles.loginLeft}>
          <Form className={styles.loginForm}>
            <Form.Field className={styles.loginFormLogin}>
              <label>Email</label>
              <input
                placeholder="Imię"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </Form.Field>
            <Form.Field className={styles.loginFormPassword}>
              <label>Hasło</label>
              <input
                type="password"
                placeholder="Hasło"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </Form.Field>
            <Button type="submit" onClick={() => login(email, password)}>
              Zaloguj się
            </Button>
            <div className={styles.registerButtonSection}>
            <p style={{textAlign: "center", fontWeight: "bold", paddingRight: "30px", paddingTop:"10px"}}>Nie masz jeszcze konta?</p>
          <Link to="/zarejestruj"><Button content="Zarejestruj się" icon="signup" size="big" /></Link>
            </div>
         
          </Form>
     
       </div>

        <div className={styles.loginRight}>
         <div className={styles.rightsideLogin}>
           <div className={styles.rightsideLoginPic}></div>
         </div>
        </div>
        </div>


      
    </Segment>
  );
};

export default Login;
