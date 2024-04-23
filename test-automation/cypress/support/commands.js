import Homepage from '../page-objects/pages/Homepage';
const homepage = new Homepage();

// Trigger API service spin up by sending response
Cypress.Commands.add('spinupContainer', (url) => {
    cy.request({
        method: 'GET',
        url: `${url}/users`
    }).then((response) => {
        expect(response.status).to.eq(200);
        homepage.visit('/');
        homepage.elements.userItemList.userItems()
    });
});

// Delete all users
Cypress.Commands.add('deleteAllUsers', (url) => {
    cy.request({
        method: 'DELETE',
        url: `${url}/users`
    }).then((response) => {
        expect(response.status).to.eq(200);
    });
});
