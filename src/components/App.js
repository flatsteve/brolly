import React, { Component } from "react";

import { AppProvider } from "../data/store";

import logoIcon from "../icons/logo.svg";
import Location from "./Location";
import DatePicker from "./DatePicker";
import ForecastContainer from "./ForecastContainer";

import "../styles/styles.scss";
import "./app.scss";

export default class App extends Component {
  render() {
    return (
      <AppProvider>
        <div className="app">
          <div
            className="logo"
            dangerouslySetInnerHTML={{ __html: logoIcon }}
          />

          <div className="app-controls">
            <Location />
            <DatePicker />
          </div>

          <ForecastContainer />
        </div>
      </AppProvider>
    );
  }
}
