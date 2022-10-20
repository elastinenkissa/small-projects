module.exports = {
  projects: [
    {
      displayName: 'server',
      testMatch: ['<rootDir>/tests/*.js'],
      testEnvironment: 'node',
    },
    {
      displayName: 'client',
      testMatch: ['<rootDir>/frontend/src/components/*.test.jsx'],
      testEnvironment: 'jest-environment-jsdom',
    },
  ],
};
