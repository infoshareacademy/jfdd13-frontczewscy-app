import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Input, TextArea, Form } from "semantic-ui-react";
import styles from "./AddForm.module.css";

function AddForm() {
  return (
    <div className={styles.addForm}>

      <label>NAMEs</label>
      <Input focus type="text" placeholder="NAME" id="name" />
      <label>SHORT DESCRIPTION</label>
      <Input focus type="text" placeholder="SHORT DESCRIPTION" id="name" />
      <label>IMAGE</label>
      <Input focus type="text" placeholder="IMAGE" id="name" />
      <label>ADDRESS</label>
      <Input focus type="text" placeholder="ADDRESS" id="name" />
      <label>PHONE NUMBER</label>
      <Input focus type="text" placeholder="PHONE NUMBER" id="name" />
      <label>LONG DESCRIPTION</label>
      <Form><TextArea f rows={2} placeholder='Tell us more' /></Form>

    </div>)
}

export default AddForm;
