import React, { Component, createContext } from "react";

const INITIAL_LOCATION = {
  id: "353101",
  name: "Potternewton",
  region: "West Yorkshire",
  latitude: "53.8209",
  longitude: "-1.5428"
};

const store = createContext({ location: INITIAL_LOCATION });
const Provider = store.Provider;

export class AppProvider extends Component {
  state = {
    location:
      JSON.parse(window.localStorage.getItem("brolly_location")) ||
      INITIAL_LOCATION,
    updateLocation: location => this.setState({ location }),
    forecast:
      JSON.parse(window.localStorage.getItem("brolly_forecast")) || null,
    updateForecast: forecast => this.setState({ forecast })
  };

  componentDidUpdate() {
    const dataToCacheLocally = ["location", "forecast"];

    Object.keys(this.state).forEach(key => {
      if (dataToCacheLocally.includes(key) && this.state[key]) {
        window.localStorage.setItem(
          `brolly_${key}`,
          JSON.stringify(this.state[key])
        );
      }
    });
  }

  storeLocally = (key, value) => {
    window.localStorage.setItem(`brolly_${key}`, JSON.stringify(value));
  };

  render() {
    console.log("STORE", this.state);
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
