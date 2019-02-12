module.exports = {
  setupFiles: ["jest-localstorage-mock"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/tests/mocks/styleMock.js",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/tests/mocks/fileMock.js"
  }
};
