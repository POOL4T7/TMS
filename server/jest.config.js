/** @type {import('ts-jest').JestConfigWithTsJest} */
// const { pathsToModuleNameMapper } = require('ts-jest');

module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '@src/*': './src/*',
    '@config/*': './config/*',
  },
  roots: [
    './src', // Define root directory for Jest
    './__tests__', // Add test directory to roots
  ],
};
