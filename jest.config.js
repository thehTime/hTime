module.exports = {
  rootDir: __dirname,
  verbose: true,
  roots: [
    '<rootDir>/test/',
  ],
  moduleNameMapper: {
    'src/(.*)': [
      '<rootDir>/src/$1',
    ],
  },
};
