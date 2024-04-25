import Homepage from '../page-objects/pages/Homepage';
import { createRandomUser } from './test-data-generation';
const homepage = new Homepage();

// Trigger API service spin up by sending response
Cypress.Commands.add('spinupContainer', (url) => {
    cy.request({
        method: 'GET',
        url: `${url}/users`
    }).then((response) => {
        expect(response.status).to.eq(200);
        homepage.visit('/');
        homepage.elements.userItemList.userItems();
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

Cypress.Commands.add('seed', (url) => {
    cy.fixture('test-data/users.seed.data.json').then((users) => {
        cy.log(users);
        users.forEach((user) => {
            cy.request({
                method: 'POST',
                url: `${url}/users`,
                body: user
            }).then((response) => {
                expect(response.status).to.eq(201);
            });
        });
    });
});
