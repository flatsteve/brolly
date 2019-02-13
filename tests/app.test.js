import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  waitForElement
} from "react-testing-library";
import "jest-dom/extend-expect";

import { getWeatherForecast } from "../src/services/api";
import { forecast } from "./fixtures/sampleData";
import App from "../src/components/App";
import MockDate from "mockdate";

jest.mock("../src/services/api");
beforeAll(() => {
  MockDate.set("2019-02-13T10:00:00");
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
});
afterEach(cleanup);

describe("Basic app states", () => {
  it("Shows an error when there is a problem getting the forecast", async () => {
    getWeatherForecast.mockImplementationOnce(() => Promise.reject());

    const { getByTestId } = render(<App />);
    await waitForElement(() => getByTestId("forecast-error-text"));

    expect(getByTestId("forecast-error-text")).toHaveTextContent(
      "Something went wrong: try refreshing"
    );
  });

  it("Shows an empty state when there is no forecast data", async () => {
    getWeatherForecast.mockImplementationOnce(() => Promise.resolve());

    const { getByTestId } = render(<App />);
    await waitForElement(() => getByTestId("forecast-empty-text"));

    expect(getByTestId("forecast-empty-text")).toHaveTextContent(
      "No forecast available. Try refreshing."
    );
  });

  it("Displays forecast information when available", async () => {
    getWeatherForecast.mockImplementationOnce(() =>
      Promise.resolve({ data: forecast })
    );

    const { getByTestId } = render(<App />);
    await waitForElement(() => getByTestId("forecast-summary-text"));

    expect(getByTestId("location-input").value).toBe("City Of London");
    expect(getByTestId("forecast-summary-text")).toHaveTextContent("Cloudy");

    fireEvent.click(getByTestId("date-next-button"));
    expect(getByTestId("forecast-summary-text")).toHaveTextContent(
      "Partly cloudy"
    );
  });
});
