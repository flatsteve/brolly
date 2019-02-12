import React, { Component } from "react";
import { subDays, addDays, format, isSameDay } from "date-fns";
import { withStore } from "../data/store";
import arrowIcon from "../icons/arrow.svg";

import "./DatePicker.scss";

class DatePicker extends Component {
  setDate = type => {
    const date = this.props.store.date;

    if (type === "decrement") {
      return this.props.store.updateDate(subDays(date, 1));
    }

    return this.props.store.updateDate(addDays(date, 1));
  };

  isDisabled = type => {
    if (!this.props.store.forecast) {
      return true;
    }

    const date = this.props.store.date;
    const lastForecastDateAvailable = this.props.store.forecast[
      this.props.store.forecast.length - 1
    ].date;

    if (type === "decrement") {
      return isSameDay(date, new Date());
    }

    return isSameDay(date, lastForecastDateAvailable);
  };

  render() {
    const { date } = this.props.store;

    return (
      <div className="date-picker">
        <div
          data-testid="date-previous-button"
          onClick={() => this.setDate("decrement")}
          className={`date-picker__icon date-picker__icon--back ${this.isDisabled(
            "decrement"
          ) && "date-picker__icon--disabled"}`}
          dangerouslySetInnerHTML={{ __html: arrowIcon }}
        />

        <p className="date-picker__date">{format(date, "ddd, Do MMM")}</p>

        <div
          data-testid="date-next-button"
          onClick={this.setDate}
          className={`date-picker__icon ${this.isDisabled() &&
            "date-picker__icon--disabled"}`}
          dangerouslySetInnerHTML={{ __html: arrowIcon }}
        />
      </div>
    );
  }
}

export default withStore(DatePicker);
