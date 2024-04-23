const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    specPattern: 'cypress/specs/**/*.cy.{js,jsx,ts,tsx}',
    reporter: 'cypress-mochawesome-reporter',
    testIsolation: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://demo-app-client.onrender.com/',
    env: {
        apiBaseUrl: 'https://demo-rest-api-iwij.onrender.com'
    }
  },
})