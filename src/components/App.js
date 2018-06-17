import React, { Component } from "react";
import ReactDOM from "react-dom";

import { AppProvider } from "../data/store";
import GradientBackground from "./GradientBackground";
import Location from "./Location";
import Forecast from "./Forecast";

import "../styles/app.scss";

export default class App extends Component {
  render() {
    return (
      <div>
        <AppProvider>
          <GradientBackground>
            <Location />
            <Forecast />
          </GradientBackground>
        </AppProvider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
