import React from "react";
import ReactDOM from "react-dom";
import Location from "./components/Location";

const App = () => {
  return (
    <div>
      <Location />
    </div>
  );
};

export default App;
ReactDOM.render(<App />, document.getElementById("app"));
