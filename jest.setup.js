jest.mock('clipboardy', () => {
  return {
    writeSync: jest.fn()
  }
});

jest.mock('terminal-kit', () => {
  return {
    terminal: {
      red: jest.fn(),
      green: jest.fn(),
      white: jest.fn(),
      inputField: jest.fn(),
      singleColumnMenu: jest.fn(),
    }
  }
});
