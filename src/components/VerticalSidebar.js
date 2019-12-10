import PropTypes from "prop-types";
import React from "react";
import { Button, Icon, Menu, Sidebar, Input } from "semantic-ui-react";
import { Formik } from "formik";
import styles from "../screens/Search.module.css";
import "react-input-range/lib/css/index.css";

const TextInput = props => {
  return (
    <div className={styles.input}>
      <Input {...props} />
    </div>
  );
};

const SelectInput = props => {
  return (
    <div>
      <select className="ui selection dropdown dropdown" {...props}>
        <option value="all">Wszystkie</option>
        <option value="KONCERTY">KONCERTY</option>
        <option value="SPEKTAKLE">SPEKTAKLE</option>
        <option value="IMPREZY TANECZNE">IMPREZY TANECZNE</option>
        <option value="IMPREZY OKOLICZNOŚCIOWE">IMPREZY OKOLICZNOŚCIOWE</option>
        <option value="WYSTAWY, SPOTKANIA">WYSTAWY, SPOTKANIA</option>
        <option value="SPORT, REKREACJA">SPORT, REKREACJA</option>
        <option value="TARGI, KONFERENCJE">TARGI, KONFERENCJE</option>
        <option value="FILM, KINO">FILM, KINO</option>
      </select>
    </div>
  );
};

const VerticalSidebar = props => {
  const { animation, closeSidebar, direction, visible, onSearch } = props;
  return (
    <Sidebar
      as={Menu}
      animation={animation}
      direction={direction}
      icon="labeled"
      inverted
      vertical
      visible={visible}
      width="thin">
      <Button className={styles.close} onClick={closeSidebar("scale down")}>
        <Icon name="x" size="large" />
      </Button>

      <Formik
        initialValues={{
          title: "",
          partyType: "all",
          sliderValue: 1500,
          isFavorites: false
        }}
        validate={onSearch}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          onSearch(values);
        }}>
        {({
          values,
          handleChange: formikHandleChange,
          handleBlur,
          handleSubmit
        }) => {
          const handleChange = event => {
            formikHandleChange(event);
            // setTimeout(() => onSearch(values), 100); // searching when user types is temporary turned off
          };
          return (
            <form onSubmit={handleSubmit}>
              <label className={styles.label}>Wyszukaj po nazwie</label>
              <TextInput
                type="text"
                name="title"
                placeholder="nazwa imprezy"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              <label className={styles.label}>Kategoria</label>
              <SelectInput
                name="partyType"
                placeholder="Rodzaj imprezy"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.partyType}
              />
              <div className={styles.sliderContainer}>
                <div className={styles.sliderLabel}>Maksymalna cena </div>
                <input
                  className={styles.slider}
                  type="range"
                  name="sliderValue"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min="0"
                  max="1500"
                  value={values.sliderValue}
                  step="1"
                />
                <div className={styles.value}>{values.sliderValue} zł</div>
              </div>
              <div className={styles.favorites}>
                <p>Pokaż tylko ulubione</p>
                <input
                  type="checkbox"
                  name="isFavorites"
                  checked={values.isFavorites}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.isFavorites}
                />
              </div>
            </form>
          );
        }}
      </Formik>
    </Sidebar>
  );
};

VerticalSidebar.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool
};

export default VerticalSidebar;
