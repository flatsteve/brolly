import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import App from "../src/components/App";

afterEach(cleanup);

test("loads and displays greeting", async () => {
  const { getByText, getByTestId } = render(<App />);
});
