import React, { Component, createContext } from "react";

const INITIAL_LOCATION = {
  id: "351638",
  name: "Govan",
  region: "Glasgow",
  latitude: "55.8626",
  longitude: "-4.3115"
};

const store = createContext({ location: INITIAL_LOCATION });
const Provider = store.Provider;

export class AppProvider extends Component {
  state = {
    location: INITIAL_LOCATION,
    updateLocation: location => this.setState({ location }),
    forecast: null,
    updateForecast: forecast => this.setState({ forecast })
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export function withStore(Component) {
  return props => {
    return (
      <store.Consumer>
        {store => {
          return <Component {...props} store={store} />;
        }}
      </store.Consumer>
    );
  };
}
