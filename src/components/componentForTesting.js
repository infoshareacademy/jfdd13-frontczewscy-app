import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import React, { Component } from "react";

class SearchSlider extends React.Component {
  state = {
    value: 50
  };

  render() {
    return (
      <InputRange
        maxValue={500}
        minValue={0}
        value={this.state.value}
        onChange={value => this.setState({ value })}
        onChangeComplete={value => console.log(value)}
      />
    );
  }
}
