import React from "react";
import { Formik, Field } from "formik";
import { Input, TextArea, Form, Button, Select } from "semantic-ui-react";
import { DropdownField } from "./DropdownField";
import * as Yup from "yup";
import moment from 'moment'
import styles from "./AddForm.module.css";




const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const urlRegExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
const priceRegEx = /^\d+(,\d{1,2})/;

const partyOptions = [
  { key: '1', value: '1', text: 'IMPREZA TANECZNA' },
  { key: '2', value: '2', text: 'KONCERT' },
  { key: '3', value: '3', text: 'IMPREZA NIETANECZNA' }]

  const FILE_SIZE = 160 * 1024;
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
  ];

const accountFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, 'Za krótki tytuł')
    .max(69, 'Za długi tytuł'),
  description: Yup.string()
    .min(5, 'Za krótki opis')
    .max(69, 'Za długi opis'),
  // image: Yup.string(),
  // date: Yup.string(),
  // partyType: Yup.string(),
  price: Yup.string()
    .matches(priceRegEx, 'Błędny format ceny! Poprawny format xx.xx'),
  address: Yup.string(),
  phoneNumber: Yup.string().matches(phoneRegExp, 'Błędny format numeru'),
  website: Yup.string().matches(urlRegExp, 'Błędny format url'),
  email: Yup.string()
    .max(100, "Za długi email")
    .email("Zły format email")
    .required("Pole wymagane!"),


});
const TextInput = props => {
  const { name, errors, touched } = props;
  return (
    <div >
      <Input {...props} error={errors[name] && touched[name]} />
      <div>{errors[name] && touched[name] && errors[name]}</div>
    </div>
  );
};

const SelectInput = props => {
  const { name, errors, touched } = props;
  return (
    <div >
      <select className="ui selection dropdown" options={partyOptions} {...props} error={errors[name] && touched[name]}>
        <option value="IMPREZA TANECZNA">IMPREZA TANECZNA</option>
        <option value="KONCERT">KONCERT</option>
        <option value="IMPREZA NIETANECZNA">IMPREZA NIETANECZNA</option>
      </select>



    </div>
  );
};


const AddForm = () => (
  <div>

    <Formik
      initialValues={{
        title: "",
        description: "",
        image: "",
        date: moment().format("MMM Do YY"),
        partyType: "",
        price: "",
        address: "",
        phoneNumber: "",
        email: "",
        website: ""

      }}
      validationSchema={accountFormSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        console.log(values);
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 2000);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
        /* and other goodies */
      }) => {
        console.log(values)
        return (
          <div className={styles.addForm}>
          <form onSubmit={handleSubmit}>
            <label>TYTUŁ</label>
            <TextInput
              type="text"
              name="title"
              placeholder="nazwa imprezy"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              touched={touched}
              errors={errors}
            />
            <label>OPIS</label>
            <TextInput
              type="text"
              name="description"
              placeholder="krótki opis"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.Description}
              touched={touched}
              errors={errors}
            />
            <label>ZDJĘCIE</label>
            <TextInput
              type="file"
              name="image"
              placeholder="zdjęcie"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.image}
              touched={touched}
              errors={errors}
            />
            <label>DATA</label>
            <TextInput
              type="text"
              name="date"
              placeholder="data wydarzenia"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.date}
              touched={touched}
              errors={errors}
            />
            <label>CENA ZA OSOBĘ</label>
            <TextInput
              type="text"
              name="price"
              placeholder="cena za osobę"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.price}
              touched={touched}
              errors={errors}
            />
            <label>ADRES</label>
            <TextInput
              type="text"
              name="address"
              placeholder="adres wydarzenia"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address}
              touched={touched}
              errors={errors}
            />
            <label>NR KONTAKTOWY</label>
            <TextInput
              type="text"
              name="phoneNumber"
              placeholder="numer kontaktowy"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phoneNumber}
              touched={touched}
              errors={errors}
            />
            <label>EMAIL</label>
            <TextInput
              type="email"
              name="email"
              placeholder="e-mail"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              touched={touched}
              errors={errors}
            />
            <label>STRONA</label>
            <TextInput

              type="text"
              name="website"
              placeholder="Strona internetowa"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.website}
              touched={touched}
              errors={errors}
            />
            <label>RODZAJ IMPREZY</label>
            <SelectInput
              name="partyType"
              placeholder="Rodzaj imprezy"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.partyType}
              touched={touched}
              errors={errors} />



            <button type="submit">Submit</button>
          </form>
          </div>
        )
      }}
    </Formik>
  </div>
);




export default AddForm;
