import React from "react";
import { Formik } from "formik";
import { Input, Button, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import moment from "moment";
import styles from "./AddForm.module.css";

//example of image url
const sampleURL =
  "https://farm4.staticflickr.com/3894/15008518202.c265dfa55f.h.png";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const urlRegExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
const priceRegEx = /^\d+(\,\d{1,2})?$/;
const imageRegEx = /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/; // make new regex

const accountFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "Za krótki tytuł")
    .max(69, "Za długi tytuł")
    .required("Pole wymagane!"),
  description: Yup.string()
    .min(5, "Za krótki opis")
    .max(69, "Za długi opis")
    .required("Pole wymagane!"),
  image: Yup.string().matches(imageRegEx, "Błędny format url"),
  price: Yup.string()
    .matches(priceRegEx, "Błędny format ceny! Poprawny format xx,xx")
    .required("Cena jest wymagana, podaj 0 jeżeli jeżeli ipreza jest darmowa."),
  address: Yup.string(),
  phoneNumber: Yup.string().matches(phoneRegExp, "Błędny format numeru"),
  website: Yup.string().matches(urlRegExp, "Błędny format url"),
  email: Yup.string()
    .max(100, "Za długi email")
    .email("Zły format email")
    .required("Pole wymagane!")
});

// .matches(imageRegEx, 'Błędny format url'),

const TextInput = props => {
  const { name, errors, touched, labelform, tooltiptext } = props;
  return (
    <div>
      <label>
        <div className={styles.tooltip}>
          {labelform}
          {tooltiptext && (
            <span className={styles.tooltiptext}>{tooltiptext}</span>
          )}
        </div>
        <Input {...props} error={errors[name] && touched[name]} />{" "}
      </label>
      <div className={styles.error}>
        {errors[name] && touched[name] && errors[name]}
      </div>
    </div>
  );
};
const InfoSegment = () => (
  <Segment>
    Wypełnij poniższy formularz. Pola z gwiazdką są wymagane. Pamiętaj aby podać
    jak najdokładniejsze dane!
  </Segment>
);

const SelectInput = props => {
  const { name, errors, touched, labelform, tooltiptext } = props;
  return (
    <div>
      <label>
        <div className={styles.tooltip}>
          {labelform}
          {tooltiptext && (
            <span className={styles.tooltiptext}>{tooltiptext}</span>
          )}
        </div>
        <select
          style={{ width: "100%" }}
          className="ui selection dropdown"
          {...props}
          error={errors[name] && touched[name]}>
          <option value="IMPREZA TANECZNA">IMPREZA TANECZNA</option>
          <option value="KONCERT">KONCERT</option>
          <option value="IMPREZA NIETANECZNA">IMPREZA NIETANECZNA</option>
        </select>
      </label>
    </div>
  );
};

const postData = values => {
  fetch("https://frontczewscy-database.firebaseio.com/parties.json", {
    method: "POST",
    body: JSON.stringify(values)
  });
};

class AddForm extends React.Component {
  state = {
    btnLoading: false,
    btnDisabled: false
  };
  render() {
    return (
      <div>
        <Formik
          initialValues={{
            title: "Title",
            description: "lorem ipsum dolor sip mate what cosaoa",
            image: "",
            date: moment().format("MMM Do YY"),
            hour: "",
            partyType: "",
            price: "0",
            street: "",
            town: "",
            phoneNumber: "",
            email: "mateusz.rostkowsky995@gmail.com",
            website: ""
          }}
          validationSchema={accountFormSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            this.setState({ btnLoading: true, btnDisabled: true });

            setTimeout(() => {
              resetForm();
              this.setState({ btnLoading: false, btnDisabled: false });
            }, 3000);
            postData(values);
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
                <InfoSegment></InfoSegment>
                <form onSubmit={handleSubmit}>
                  <TextInput
                    labelform="TYTUŁ"
                    tooltiptext="Tutaj wpisz swój tytuł"
                    type="text"
                    name="title"
                    placeholder="nazwa imprezy"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    touched={touched}
                    errors={errors}
                    label={{ icon: "asterisk" }}
                    labelPosition="right corner"
                  />
                  <TextInput
                    labelform="OPIS"
                    tooltiptext="Tutaj wpisz opis wydarzenia, które chcesz dodać"
                    type="text"
                    name="description"
                    placeholder="krótki opis"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    touched={touched}
                    errors={errors}
                    label={{ icon: "asterisk" }}
                    labelPosition="right corner"
                  />
                  <TextInput
                    labelform="ZDJĘCIE"
                    tooltiptext="Wklej link URL zdjęcia. Preferowany kształt zdjęcia to kwadrat"
                    type="text"
                    name="image"
                    placeholder="url zdjęcia"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.image}
                    touched={touched}
                    errors={errors}
                  />
                  <TextInput
                    labelform="DATA WYDARZENIA"
                    tooltiptext="Poinformuj użytkownika kiedy będzie Twoje wydarzenie."
                    type="text"
                    name="date"
                    placeholder="data wydarzenia"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.date}
                    touched={touched}
                    errors={errors}
                  />
                  <TextInput
                    labelform="GODZINA WYDARZENIA"
                    tooltiptext="Poinformuj użytkownika o której godzinie odbędzie się Twoje wydarzenie."
                    type="text"
                    name="hour"
                    placeholder="godzina wydarzenia"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.hour}
                    touched={touched}
                    errors={errors}
                  />
                  <TextInput
                    labelform="CENA ZA OSOBĘ"
                    tooltiptext="Tutaj podaj cenę za bilet. Pamiętaj o tym, że kwota jest w złotówkach."
                    type="text"
                    name="price"
                    placeholder="cena za osobę"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    touched={touched}
                    errors={errors}
                    label={
                      <span
                        style={{ width: "50px", backgroundColor: "#e8e8e8" }}>
                        ZŁ
                      </span>
                    }
                  />
                  <TextInput
                    labelform="ULICA / Numer"
                    tooltiptext="Tutaj wpisz lokalizację wydarzenia."
                    type="text"
                    name="street"
                    placeholder="Ulica oraz numer wydarzenia"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.street}
                    touched={touched}
                    errors={errors}
                  />
                  <TextInput
                    labelform="MIASTO"
                    tooltiptext="Tutaj wpisz miasto wydarzenia."
                    type="text"
                    name="town"
                    placeholder="miasto wydarzenia"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.town}
                    touched={touched}
                    errors={errors}
                  />
                  <TextInput
                    labelform="NUMER KONTAKTOWY"
                    tooltiptext="Tutaj wpisz numer. Błędny format nie przejdzie walidacji."
                    type="text"
                    name="phoneNumber"
                    placeholder="numer kontaktowy"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phoneNumber}
                    touched={touched}
                    errors={errors}
                  />
                  <TextInput
                    labelform="EMAIL"
                    tooltiptext="Tutaj wpisz cały adres e-mail."
                    type="email"
                    name="email"
                    placeholder="e-mail"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    touched={touched}
                    errors={errors}
                    label={{ icon: "asterisk" }}
                    labelPosition="right corner"
                  />
                  <TextInput
                    labelform="STRONA"
                    tooltiptext="Podaj adres strony. Nie wymagamy www i http(s)."
                    type="text"
                    name="website"
                    placeholder="Strona internetowa"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.website}
                    touched={touched}
                    errors={errors}
                  />
                  <SelectInput
                    labelform="RODZAJ IMPREZY"
                    tooltiptext="Wybierz rodzaj imprezy."
                    name="partyType"
                    placeholder="Rodzaj imprezy"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.partyType}
                    touched={touched}
                    errors={errors}
                  />

                  <Button
                    style={{ marginTop: "10px" }}
                    className={styles.formBtn}
                    content="DODAJ WYDARZENIE"
                    type="submit"
                    loading={this.state.btnLoading}
                    disabled={this.state.btnDisabled}
                  />
                </form>
              </div>
            );
          }}
        </Formik>
      </div>
    );
  }
}

export default AddForm;
