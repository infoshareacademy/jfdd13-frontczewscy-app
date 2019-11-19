import PropTypes from "prop-types";
import React from "react";
import { Button, Icon, Menu, Sidebar, Input } from "semantic-ui-react";
import { Formik } from "formik";
import styles from "./Search.module.css";
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
        <option value="IMPREZA TANECZNA">IMPREZA TANECZNA</option>
        <option value="KONCERT">KONCERT</option>
        <option value="IMPREZA NIETANECZNA">IMPREZA NIETANECZNA</option>        
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
      width="thin"
    >
      <Button className={styles.close} onClick={closeSidebar("scale down")}>
        <Icon name="x" size="large" />
      </Button>

      <Formik
        initialValues={{
          title: "",
          partyType: "",
          sliderValue: 10
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          onSearch(values);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => {
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
                  max="500"
                  value={values.sliderValue}
                  step="1"
                />
                <div className={styles.value}>{values.sliderValue} zł</div>
              </div>

              <button type="submit">Submit</button>
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
