module.exports = {
  setupFiles: ["./tests/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/tests/mocks/styleMock.js",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/tests/mocks/fileMock.js"
  }
};
