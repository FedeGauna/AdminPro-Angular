import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',

  roots: ['<rootDir>/src'],

  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/src/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$'
      }
    ]
  },

  moduleFileExtensions: ['ts', 'html', 'js', 'json'],

  testMatch: ['**/*.spec.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],

  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1'
  },

  collectCoverage: true,
  coverageDirectory: 'coverage',

  maxWorkers: '50%',
  cache: true,
};

export default config;