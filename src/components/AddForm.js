import React from "react";
import { Formik } from "formik";
import { Input, Button, Segment, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import moment from "moment";
import "moment/locale/pl";
import styles from "./AddForm.module.css";

//example of image url
// const sampleURL =
//   "https://farm4.staticflickr.com/3894/15008518202.c265dfa55f.h.png";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const urlRegExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
const priceRegEx = /^\d+(\,\d{1,2})?$/;
const imageRegEx = /^(http)?s?:?((\/)?(\/)?[^"'><;",()]*\.(?:png|jpg|jpeg|gif|png|svg))/;

const accountFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "Za krótki tytuł")
    .max(69, "Za długi tytuł")
    .required("Pole wymagane!"),
  description: Yup.string()
    .min(35, "Za krótki opis")
    .max(400, "Za długi opis")
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
          <option value="KONCERTY">KONCERTY</option>
          <option value="SPEKTAKLE">SPEKTAKLE</option>
          <option value="IMPREZY TANECZNE">IMPREZY TANECZNE</option>
          <option value="IMPREZY OKOLICZNOŚCIOWE">
            IMPREZY OKOLICZNOŚCIOWE
          </option>
          <option value="WYSTAWY, SPOTKANIA">WYSTAWY, SPOTKANIA</option>
          <option value="SPORT, REKREACJA">SPORT, REKREACJA</option>
          <option value="TARGI, KONFERENCJE">TARGI, KONFERENCJE</option>
          <option value="FILM, KINO">FILM, KINO</option>
        </select>
      </label>
    </div>
  );
};

const Textarea = props => {
  const { name, errors, touched, labelform, tooltiptext } = props;
  return (
    <label>
      <div className={styles.tooltip}>
        {labelform}
        {tooltiptext && (
          <span className={styles.tooltiptext}>{tooltiptext}</span>
        )}
      </div>
      <div className="ui focus input">
        <textarea
          style={{
            minHeight: 200,
            minWidth: "100%",
            maxWidth: "100%",
            resize: "none"
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

const postData = values => {
  fetch("https://frontczewscy-database.firebaseio.com/parties.json", {
    method: "POST",
    body: JSON.stringify(values)
  });
};

class AddForm extends React.Component {
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
      <div>
        <Formik
          initialValues={{
            title: "",
            description: "",
            description2: "dhsahdashdhashdas",
            image: "",
            date: moment().format("L"),
            hour: "",
            partyType: "KONCERTY",
            price: "0",
            street: "",
            town: "",
            phoneNumber: "",
            email: "",
            website: ""
          }}
          validationSchema={accountFormSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            this.setState({ btnLoading: true, btnDisabled: true });

            setTimeout(() => {
              resetForm();
              this.setState({ btnLoading: false, btnDisabled: false });
              this.showMessage();
            }, 2000);

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
                    labelform="TYTUŁ *"
                    tooltiptext="Tutaj wpisz swój tytuł"
                    type="text"
                    name="title"
                    placeholder="nazwa imprezy"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    touched={touched}
                    errors={errors}
                  />

                  <Textarea
                    labelform="OPIS *"
                    name="description"
                    tooltiptext="Tutaj wpisz opis wydarzenia, które chcesz dodać"
                    placeholder="Tutaj wpisz opis wydarzenia, które chcesz dodać"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    touched={touched}
                    errors={errors}
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
                    labelform="CENA ZA OSOBĘ *"
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
                    labelform="EMAIL *"
                    tooltiptext="Tutaj wpisz cały adres e-mail."
                    type="email"
                    name="email"
                    placeholder="e-mail"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    touched={touched}
                    errors={errors}
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
                  <Link to="/wyszukaj">
                    <Message
                      success
                      hidden={!this.state.isMessageShown}
                      header="Dodawanie nowego wydarzenia powiodło się"
                      content="Kliknij tutaj aby swoje wydarzenie na liście wszystkich wydarzeń"
                    />
                  </Link>
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
