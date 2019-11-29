import React from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { Input, Button, Segment, Message, Form, Divider, Checkbox } from "semantic-ui-react";
import * as moment from 'moment';
import { register } from "../services/AuthService"

import * as Yup from "yup";

import styles from "./Register.module.css";

const FormInfoHeader = () => {
  return (
    <div style={{width:"80%"}} className="ui icon message">
      <div className="content">
        <div className="header">Witaj w formularzu rejestracji.</div>
        <p>
           Pola z <i className={styles.star}> * </i> są wymagane.
        </p>
      </div>
    </div>
  );
};

const TextInput = props => {
  const { name, errors, touched, labelform, tooltiptext, labelRequire } = props;
  return (
    <div>
      <label >
        <div style={{width:"80%"}} className={styles.tooltip}>
          {labelform}
          <span className={styles.star}>{labelRequire}</span>
    
        </div>
        <Input style={{width:"80%"}} {...props} error={errors[name] && touched[name]} />{" "}
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
      <div style={{width:"80%"}} className={styles.tooltip}>
        {labelform}
      
      </div>
      <div className="ui focus input">
        <textarea
          style={{
            minHeight: 200,
          
            resize: "none",
            width:"80%"
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
    isMessageShown: false
  };

  showMessage = () => {
    this.setState({
      isMessageShown: true
    });
    setTimeout(() => {
      this.setState({
        isMessageShown: false
      });
    }, 7000);
  };

  render() {
    return (
      <div className={styles.registerBody}>
        <div className={styles.leftsideRegister}>
          <div className={styles.fixedPicture}></div>
        </div>
      <div className={styles.rightsideRegister}>
        <Segment style={{height:"auto"}}>
    
        <Formik
          initialValues={{
            email: ""
        
          }}
      
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            
            this.setState({ btnLoading: true, btnDisabled: true });

            const {email, password, name, bio, joined} = values
            register(email, password, name, bio, joined)

            setTimeout(() => {
              resetForm();
              this.setState({ btnLoading: false, btnDisabled: false });
              this.showMessage();
            }, 2000);
          }}
        >
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
                    labelRequire="*"
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
                    style={{ marginTop: "10px" }}
                    className={styles.formBtn}
                    content="Zresetuj"
                    type="submit"
                    loading={this.state.btnLoading}
                    disabled={this.state.btnDisabled}
                  />
        

                  <Message
                    success
                    hidden={!this.state.isMessageShown}
                    header="REJESTRACJA SIĘ POWIODŁA"
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
