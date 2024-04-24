it('Response for "GET users" request has status 200', () => {
    cy.api({
        method: 'GET',
        url: `${Cypress.env('apiBaseUrl')}/users`
    }).then((response) => {
        assert.equal(response.status, 200)
    })
});