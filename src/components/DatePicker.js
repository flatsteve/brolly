import React, { Component } from "react";
import { format } from "date-fns";
import { withStore } from "../data/store";
import arrow from "../icons/arrow.svg";

import "./DatePicker.scss";

class DatePicker extends Component {
  state = {
    date: new Date()
  };

  render() {
    const { date } = this.state;

    return (
      <div class="date-picker">
        <div
          className="date-picker__icon date-picker__icon--back"
          dangerouslySetInnerHTML={{ __html: arrow }}
        />

        <p className="date-picker__date">{format(date, "ddd, Do MMM")}</p>

        <div
          className="date-picker__icon"
          dangerouslySetInnerHTML={{ __html: arrow }}
        />
      </div>
    );
  }
}

export default withStore(DatePicker);
