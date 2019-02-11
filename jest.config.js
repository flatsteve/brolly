module.exports = {
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/tests/mocks/styleMock.js",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/tests/mocks/fileMock.js"
  },
  transformIgnorePatterns: ["/node_modules/(?!lodash-es).+\\.js$"]
};
