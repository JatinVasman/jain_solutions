import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@rental-platform/types$': '<rootDir>/../../../packages/types/src',
    '^@rental-platform/validation$': '<rootDir>/../../../packages/validation/src',
    '^@rental-platform/config$': '<rootDir>/../../../packages/config/src',
  },
  transformIgnorePatterns: [
    'node_modules/(?!.*(@nestjs/jwt)/)',
  ],
  collectCoverageFrom: ['**/*.(t|j)s', '!**/*.module.ts', '!main.ts'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};

export default config;
