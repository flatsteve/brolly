import React, { Component } from "react";
import ReactDOM from "react-dom";

import { AppProvider } from "../data/store";

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
          <h2 className="logo">Brolly</h2>

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

ReactDOM.render(<App />, document.getElementById("app"));
