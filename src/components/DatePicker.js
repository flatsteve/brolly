import React, { Component } from "react";
import { format } from "date-fns";
import { withStore } from "../data/store";

import "./DatePicker.scss";

class DatePicker extends Component {
  state = {
    date: new Date()
  };

  render() {
    const { date } = this.state;

    return <p className="date">{format(date, "ddd, Do MMM")}</p>;
  }
}

export default withStore(DatePicker);
