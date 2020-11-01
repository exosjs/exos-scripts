/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const ROOT_PATH = path.resolve(process.cwd());

module.exports = {
  rootDir: ROOT_PATH,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/*.spec.[jt]s?(x)'],
  testPathIgnorePatterns: ['/lib/', '/dist/', '/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: !!process.env.CI,
  collectCoverageFrom: ['./src/**/*.[jt]s?(x)'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|svg)$': path.join(__dirname, 'FileMock.js'),
  },
};
