import React from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
  Segment,
  Message,
  Form,
  Divider,
  Checkbox
} from "semantic-ui-react";
import * as moment from "moment";
import { register, passwordReset } from "../services/AuthService";

import * as Yup from "yup";

import styles from "./Reset.module.css";

const FormInfoHeader = () => {
  return (
    <div style={{ width: "80%" }} className="ui icon message">
      <div className="content">
        <div className="header">Zresetuj swoje hasło</div>
        <p>
        Wprowadź adres e-mail aby zresetować swoje hasło.
        </p>
      </div>
    </div>
  );
};

const TextInput = props => {
  const { name, errors, touched, labelform, tooltiptext } = props;
  return (
    <div>
      <label>
        <div style={{ width: "80%" }} className={styles.tooltip}>
          {labelform}
          <span className={styles.star}>{props.labelRequire}</span>
        </div>
        <Input
          style={{ width: "80%" }}
          {...props}
          error={errors[name] && touched[name]}
        />{" "}
      </label>
      <div className={styles.error}>
        {errors[name] && touched[name] && errors[name]}
      </div>
    </div>
  );
};

const Textarea = props => {
  const { name, errors, touched, labelform, tooltiptext } = props;
  return (
    <label>
      <div style={{ width: "80%" }} className={styles.tooltip}>
        {labelform}
      </div>
      <div className="ui focus input">
        <textarea
          style={{
            minHeight: 200,

            resize: "none",
            width: "80%"
          }}
          {...props}
          error={errors[name] && touched[name]}
        />
      </div>
      <div className={styles.error}>
        {errors[name] && touched[name] && errors[name]}
      </div>
    </label>
  );
};

class Register extends React.Component {
  state = {
    btnLoading: false,
    btnDisabled: false,
    isMessageShown: false,
    message: ""
  };

  showMessage = message => {
    this.setState({
      isMessageShown: true,
      message
    });
  };

  render() {
    return (
      <div className={styles.registerBody}>
        <div className={styles.leftsideRegister}>
          <div className={styles.fixedPicture}></div>
        </div>
        <div className={styles.rightsideRegister}>
          <Segment style={{ height: "100vh", display: "flex", justifyContent:"center", alignItems:"center", flexDirection:"column"  }} >
            <Formik
              initialValues={{
                email: ""
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true);

                this.setState({ btnLoading: true, btnDisabled: true });

                const { email, password, name, bio, joined } = values;
                passwordReset(email)
                  .then(() => {
                    this.showMessage(
                      "Email z linkiem został wysłany na podany email"
                    );
                    this.setState({ btnLoading: false, btnDisabled: false });
                  })
                  .catch(err => {
                    this.showMessage(
                      "Przykro nam nie mamy takiego adresu email"
                    );
                    this.setState({ btnLoading: false, btnDisabled: false });
                  });
              }}>
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit
              }) => {
                return (
                  <div className={styles.addForm}>
                    <FormInfoHeader />
                    <form onSubmit={handleSubmit}>
                      <TextInput
                        labelform="Email"
                        labelRequire=""
                        tooltiptext="Tutaj wpisz swój mail"
                        type="text"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        touched={touched}
                        errors={errors}
                      />

                      <Button
                        style={{ marginTop: "10px"}}
                        className={styles.formBtn}
                        content="Zresetuj"
                        type="submit"
                        loading={this.state.btnLoading}
                        disabled={this.state.btnDisabled}
                      />

                      <Message
                        success
                        hidden={!this.state.isMessageShown}
                        header={this.state.message}
                      />
                    </form>
                  </div>
                );
              }}
            </Formik>
            <div className={styles.linkContainer}>
              <Link to="/zaloguj">
                <Button content="Zaloguj się" icon="sign-in" size="big" />
              </Link>
            </div>
          </Segment>
        </div>
      </div>
    );
  }
}
export default Register;
