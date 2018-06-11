import React, { Component } from "react";
import ReactDOM from "react-dom";
import Location from "./components/Location";
import { AppProvider } from "./store";

export default class App extends Component {
  render() {
    return (
      <div>
        <AppProvider>
          <Location />
        </AppProvider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
