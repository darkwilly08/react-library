module.exports = {
  moduleNameMapper: {
    '.+\\.(css|scss)$': 'identity-obj-proxy',
    '@darkwilly08/app-bar': '<rootDir>/libs/app-bar/src/index.ts',
    '@darkwilly08/dw-button': '<rootDir>/libs/dw-button/src/index.ts',
    '@darkwilly08/common': '<rootDir>/libs/common/src/index.ts',
    '@darkwilly08/drawer': '<rootDir>/libs/drawer/src/index.ts',
    '@darkwilly08/icon-wrapper': '<rootDir>/libs/icon-wrapper/src/index.ts',
    '@darkwilly08/link': '<rootDir>/libs/link/src/index.ts',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  testMatch: ['<rootDir>/libs/**/tests/**/*.spec.{tsx,ts}'],
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
};
