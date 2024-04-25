const tv4 = require('tv4');

beforeEach(function () {
    cy.deleteAllUsers(Cypress.env('apiBaseUrl'));
    cy.seed(Cypress.env('apiBaseUrl'));
    cy.fixture('test-data/users.seed.data.json').then((users) => {
        this.users = users;
    });
    cy.fixture('schemas/users.json').then((schema) => {
        this.usersSchema = schema;
    });
});

it('Status code should equals 200', function () {
    cy.api({
        method: 'GET',
        url: `${Cypress.env('apiBaseUrl')}/users`
    }).then((response) => {
        assert.equal(response.status, 200);
    });
});

it('JSON schema should be correct', function () {
    cy.api({
        method: 'GET',
        url: `${Cypress.env('apiBaseUrl')}/users`
    }).then((response) => {
        const isValid = tv4.validate(response.body, this.usersSchema);
        expect(isValid).to.be.true;
    });
});

it('Response body should contain expected', function () {
    cy.api({
        method: 'GET',
        url: `${Cypress.env('apiBaseUrl')}/users`
    }).then((response) => {
        expect(response.body).to.deep.eq(this.users);
    });
});

it('Status code should equals 404 when not existing root is in the url', function () {
    cy.api({
        method: 'GET',
        url: `${Cypress.env('apiBaseUrl')}/users1`,
        failOnStatusCode: false
    }).then((response) => {
        assert.equal(response.status, 404);
    });
});
