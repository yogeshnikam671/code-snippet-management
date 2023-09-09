export default {
  "moduleDirectories": ['<rootDir>/src', 'node_modules'],
  "setupFiles": ['<rootDir>/jest.setup.js'],
  "setupFilesAfterEnv": ['./setupTests.js'],
  "roots": [
    "<rootDir>/src/tests"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|js)",
    "**/?(*.)+(spec|test).+(ts|js)"
  ],
  "transform": {
    "^.+\\.(ts)$": "ts-jest"
  },
}
