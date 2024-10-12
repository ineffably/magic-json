/** @type {import('ts-jest').JestConfigWithTsJest} */
const path = require('path');
const { lstatSync, readdirSync } = require('fs');
const basePath = path.resolve(__dirname, 'packages');
const packages = readdirSync(basePath).filter(name => (lstatSync(path.join(basePath, name)).isDirectory()));
const esModules = ['antd', 'ngx-bootstrap'].join('|');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/packages/core/test/**/*.test.ts',
    '<rootDir>/packages/editor/test/**/*.test.ts*'
  ],
  transformIgnorePatterns: [
    '<rootDir>/packages/editor/node_modules/',
    '<rootDir>/packages/core/node_modules/',
  ],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/css-stub.js'
  },
  verbose: true,
  collectCoverageFrom: [
    '<rootDir>/packages/editor/src/**/*.ts*',
    '<rootDir>/packages/core/src/**/*.ts',
  ],
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  coverageReporters: ['lcov', 'json', 'html', 'text'],
};