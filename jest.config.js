module.exports = {
  rootDir: __dirname,
  verbose: true,
  roots: [
    '<rootDir>/test/',
  ],
  moduleNameMapper: {
    '(.*)': [
      '<rootDir>/src/$1',
    ],
  },
};
