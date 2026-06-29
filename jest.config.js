module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['./jest.setup.js'],
  testEnvironmentOptions: {
    url: 'http://localhost/projects.html',
  },
};
