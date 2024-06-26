const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    responseTimeout: 90000,
    specPattern: 'cypress/specs/**/*.cy.{js,jsx,ts,tsx}',
    reporter: 'cypress-mochawesome-reporter',
    testIsolation: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: 'https://continuous-integration-practice.onrender.com/',
    env: {
        apiBaseUrl: 'https://ci-practice-dev.onrender.com'
    }
  },
});
