import React from "react";
import { Formik } from "formik";
import { Input, Button, Segment, Header, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import moment from "moment";
import "moment/locale/pl";
import styles from "./AddForm.module.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import DatePicker, { registerLocale } from "react-datepicker";
import pl from "date-fns/locale/pl"; // the locale you want

registerLocale("pl", pl);

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
    .max(450, "Za długi opis")
    .required("Pole wymagane!"),
  image: Yup.string()
  .matches(imageRegEx, "Błędny format url"),
  price: Yup.string()
    .matches(priceRegEx, "Błędny format ceny! Poprawny format xx,xx")
    .required("Cena jest wymagana, podaj 0 jeżeli jeżeli ipreza jest darmowa."),
  address: Yup.string(),
  phoneNumber: Yup.string()
  .matches(phoneRegExp, "Błędny format numeru"),
  website: Yup.string()
  .matches(urlRegExp, "Błędny format url"),
  email: Yup.string()
    .max(100, "Za długi email")
    .email("Zły format email")
    .required("Pole wymagane!")
});

const ModalBox = props => {
  const { open, dimmer, close } = props;
  return (
    <Modal
      dimmer={dimmer}
      open={open}
      onClose={close}
      style={{ textAlign: "center" }}>
      <Modal.Header>Dziękujemy za dodanie imprezy</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>
            Kliknij przejdź do Imprez aby zobaczyć swoje wydarzenie na liście
          </Header>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={close}>
          Chce dodać kolejne!
        </Button>
        <Link to="/wyszukaj">
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Lista wydarzeń"
          />
        </Link>
      </Modal.Actions>
    </Modal>
  );
};

const TextInput = props => {
  const { name, errors, touched, labelform, tooltiptext } = props;
  return (
    <div>
      <label>
        <div className={ styles.tooltip }>
          {labelform}
          {tooltiptext && (
            <span className={ styles.tooltiptext }>{ tooltiptext }</span>
          )}
        </div>
        <Input { ...props } error={ errors[name] && touched[name] } />{" "}
      </label>
      <div className={ styles.error }>
        { errors[name] && touched[name] && errors[name] }
      </div>
    </div>
  );
};
const DatePickerField = props => {
  const { name, value, onChange, className, labelform, locale } = props;
  return (
    <div>
      <label>
        <div className={ styles.Datelabel }>{ labelform }</div>
        <DatePicker
          locale={ locale }
          labelform={ labelform }
          timeCaption="czas"
          timeFormat="p"
          dateFormat="Pp"
          showWeekNumbers
          showTimeSelect
          fixedHeight
          minDate={ moment().toDate() }
          className={ className }
          selected={ (value && new Date(value)) || null }
          onChange={ val => {
            onChange(name, val);
          } }>
          <div style={ { color: "green" } }>Nie zapomnij o podaniu godziny!</div>
        </DatePicker>
      </label>
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
        <div className={ styles.tooltip }>
          { labelform }
          { tooltiptext && (
            <span className={ styles.tooltiptext }>{ tooltiptext }</span>
          )}
        </div>
        <select
          style={{ width: "100%" }}
          className="ui selection dropdown"
          { ...props }
          error={ errors[name] && touched[name] }>
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
      <div className={ styles.tooltip }>
        { labelform }
        { tooltiptext && (
          <span className={ styles.tooltiptext }>{ tooltiptext }</span>
        )}
      </div>
      <div className="ui focus input">
        <textarea
          maxlength="451"
          style={{
            minHeight: 100,
            minWidth: "100%",
            maxWidth: "100%",
            resize: "vertical"
          }}
          { ...props }
        />
      </div>
      <div className={ styles.error }>
        { errors[name] && touched[name] && errors[name] }
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
    isMessageShown: false,
    open: false
  };

  close = () => this.setState({ open: false });

  render() {
    const date = new Date();
    date.setMinutes(30);
    return (
      <div>
        <Formik
          initialValues={{
            title: "",
            description: "",
            image: "",
            date: date,
            hour: "",
            partyType: "KONCERTY",
            price: "0",
            street: "",
            town: "",
            phoneNumber: "",
            email: "",
            website: ""
          }}
          validationSchema= {accountFormSchema }
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            this.setState({ btnLoading: true, btnDisabled: true });
            const hour =
              values.date.getHours() + ":" + values.date.getMinutes();
            setTimeout(() => {
              resetForm();
              this.setState({
                btnLoading: false,
                btnDisabled: false,
                dimmer: "blurring",
                open: true
              });
            }, 2000);
            postData(values);
          }}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue
          }) => {
            return (
              <div className={ styles.addForm }>
                <InfoSegment></InfoSegment>
                <form onSubmit={handleSubmit}>
                  <TextInput
                    className={styles.FormFields}
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
                  <SelectInput
                    className={styles.FormFields}
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

                  <Textarea
                    className={styles.FormFields}
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

                  <DatePickerField
                    className={styles.DataPickerField}
                    name="date"
                    value={values.date}
                    onChange={setFieldValue}
                    locale="pl"
                    showTimeSelect
                    labelform="DATA I CZAS  WYDARZENIA"
                    dateFormat="dd/MM/yyyy"
                  />

                  <TextInput
                    className={styles.FormFields}
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
                    className={styles.FormFields}
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
                    className={styles.FormFields}
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
                    className={styles.FormFields}
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
                    className={styles.FormFields}
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
                    className={styles.FormFields}
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
                    className={styles.FormFields}
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

                  <Button
                    style={{ marginTop: "10px" }}
                    className={styles.formBtn}
                    content="DODAJ WYDARZENIE"
                    type="submit"
                    loading={this.state.btnLoading}
                    disabled={this.state.btnDisabled}
                  />
                  <ModalBox
                    open={this.state.open}
                    dimmer={this.state.dimmer}
                    close={this.close}
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
