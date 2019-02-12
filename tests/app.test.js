import React from "react";
import { render, cleanup, waitForElement } from "react-testing-library";
import "jest-dom/extend-expect";

import { getWeatherForecast } from "../src/services/api";
import { forecast } from "./fixtures/sampleData";
import App from "../src/components/App";

jest.mock("../src/services/api");
afterEach(cleanup);

it("Loads and displays forecast information", async () => {
  getWeatherForecast.mockImplementationOnce(() =>
    Promise.resolve({ data: forecast })
  );

  const { getByTestId } = render(<App />);

  await waitForElement(() => getByTestId("forecast-summary-text"));
  expect(getByTestId("forecast-summary-text")).toHaveTextContent("Cloudy");
});
