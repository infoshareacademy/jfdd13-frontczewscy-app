import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button, Icon, Menu, Segment, Sidebar, Input } from "semantic-ui-react";
import { Formik } from "formik";
import styles from "./Sidebar.module.css";
import "react-input-range/lib/css/index.css";

const TextInput = props => {
  const { name, errors, touched } = props;
  return (
    <div>
      <Input {...props} error={errors[name] && touched[name]} />
      <div>{errors[name] && touched[name] && errors[name]}</div>
    </div>
  );
};

const SelectInput = props => {
  const { name, errors, touched } = props;
  return (
    <div>
      <select
        className="ui selection dropdown"
        {...props}
        error={errors[name] && touched[name]}>
        <option value="IMPREZA TANECZNA">IMPREZA TANECZNA</option>
        <option value="KONCERT">KONCERT</option>
        <option value="IMPREZA NIETANECZNA">IMPREZA NIETANECZNA</option>
      </select>
    </div>
  );
};

const VerticalSidebar = props => {
  const { animation, closeSidebar, direction, visible } = props;
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
          description: "",
          partyType: "",
          sliderValue: 10
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          console.log(values);
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 2000);
        }}>
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
          return (
            <form onSubmit={handleSubmit}>
              <label className={styles.label}>TYTUŁ</label>
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
              <label className={styles.label}>OPIS</label>
              <SelectInput
                name="partyType"
                placeholder="Rodzaj imprezy"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.partyType}
                touched={touched}
                errors={errors}
              />
              <div className={styles.slider}>
                <input
                  type="range"
                  name="sliderValue"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min="0"
                  max="100"
                  value={values.sliderValue}
                  step="5"
                />
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

export default class SidebarSearch extends Component {
  state = {
    animation: "scale down",
    direction: "right",
    dimmed: false,
    visible: true,
    iconName: true
  };

  handleAnimationChange = animation => () =>
    this.setState(prevState => ({ animation, visible: !prevState.visible }));

  handleDirectionChange = direction => () =>
    this.setState({ direction, visible: false });

  render() {
    const { animation, dimmed, direction, visible } = this.state;
    const vertical = direction === "bottom" || direction === "top";

    return (
      <div>
        <Sidebar.Pushable as={Segment} className={styles.sidebar}>
          <VerticalSidebar
            animation={animation}
            direction={direction}
            visible={visible}
            closeSidebar={this.handleAnimationChange}
          />
          <Button
            className={styles.btn}
            disabled={vertical}
            onClick={this.handleAnimationChange("scale down")}>
            <Icon name="bars" size="large" />
          </Button>

          <Sidebar.Pusher dimmed={dimmed && visible}>
            <Segment basic>{this.props.children}</Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
