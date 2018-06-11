import React, { Component } from "react";
import ReactDOM from "react-dom";
import Location from "./Location";
import Forecast from "./Forecast";
import { AppProvider } from "../data/store";

export default class App extends Component {
  render() {
    return (
      <div>
        <AppProvider>
          <Location />
          <Forecast />
        </AppProvider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
