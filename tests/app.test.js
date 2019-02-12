import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import Forecast from "../src/components/Forecast";

afterEach(cleanup);

test("loads and displays no forecast message", async () => {
  const { getByTestId } = render(<Forecast />);

  expect(getByTestId("no-forecast-text")).toHaveTextContent("No forecast");
});
