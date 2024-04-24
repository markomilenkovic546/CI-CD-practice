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

/*
Cypress.Commands.add('seed', (url) => {
    for (let i = 0; i > 10; index++) {
    const userData = createRandomUser()
    cy.request({
        method: 'POST',
        url: `${url}/users`,
        body: {
            username: userData.username,
                email: userData.email,
                password: userData.password,
                firstName: userData.firstName,
                lastName: userData.lastName
        }
    }).then((response) => {
        expect(response.status).to.eq(201);
    });
}
});
*/