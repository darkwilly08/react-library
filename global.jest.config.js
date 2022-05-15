const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  // projects: getJestProjects(),
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/config/tests//styleMock.js',
    '@darkwilly08/app-bar': '<rootDir>/libs/app-bar/src/index.ts',
    '@darkwilly08/button': '<rootDir>/libs/button/src/index.ts',
    '@darkwilly08/common': '<rootDir>/libs/common/src/index.ts',
    '@darkwilly08/drawer': '<rootDir>/libs/drawer/src/index.ts',
    '@darkwilly08/icon-wrapper': '<rootDir>/libs/icon-wrapper/src/index.ts',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  testEnvironment: 'jsdom',
};
