import React, { Component, createContext } from "react";

const store = createContext();
const Provider = store.Provider;
export const Consumer = store.Consumer;

export class AppProvider extends Component {
  state = {
    locationName: "London"
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}
