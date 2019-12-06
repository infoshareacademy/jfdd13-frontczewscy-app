import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Segment,
  Input,
  Message
} from "semantic-ui-react";
import styles from "./Login.module.css";
import { login, loginWithGoogle } from "../services/AuthService";

const FormInfoHeader = () => {
  return (
    <div style={{ width: "80%" }} className="ui icon message">
      <div className="content">
        <div className="header">Zaloguj się:</div>
    
      </div>
    </div>
  );
};

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin(email, password) {
    setIsLoading(true);
    login(email, password)
      .then(value => {

        console.log(value);
      })
      .catch(() => {
        setIsLoading(false);
        setError("Przykro mi coś się nie udało");
        console.log("Something went wrong!");
      });
  }

  return (
    <Segment placeholder style={{ height: "100vh", padding: "0" }}>
   
      <div className={styles.loginBody}>
        <div className={styles.loginLeft}>
       
          <Form className={styles.loginForm}>
          <div style={{paddingBottom:"100px", fontSize:"40px", textAlign:"center", fontWeight:"bold"}}>CONCERTE
          <p style={{fontSize:"20px", marginTop:"20px"}}>Aplikacja do wyszukiwania wydarzeń.<a href="" > Sprawdź nas!</a></p></div>
            <FormInfoHeader style={{ width: "10%" }} />

            <label className={styles.label}>
              <div>Email</div>
              <Input
                className={styles.input}
                placeholder="E-mail"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </label>

            <label className={styles.label}>
              <div>Hasło</div>
              <Input
                className={styles.input}
                type="password"
                placeholder="Hasło"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </label>

            <Button
              loading={isLoading}
              style={{ marginTop: "20px" }}
              type="submit"
              onClick={() => handleLogin(email, password)}>
              Zaloguj się
            </Button>
            <Button
              style={{ marginTop: "20px" }}
              type="submit"
              onClick={() => loginWithGoogle()}>
              Zaloguj się przez google
            </Button>

            {error && (
              <Message
                style={{
                  fontWeight: "bold",
                  width: "95%",
                  textAlign: "center"
                }}>
                {error}
              </Message>
            )}
           
            <div className={styles.registerButtonSection}>
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  paddingRight: "30px",
                  paddingTop: "10px"
                }}>
                Nie masz jeszcze konta?
              </p>
              <Link to="/zarejestruj">
                <Button content="Zarejestruj się" icon="signup" size="big" />
              </Link>
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
