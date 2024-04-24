/// <reference types="Cypress" />
import { createRandomUser } from '../../support/test-data-generation';
import Homepage from '../../page-objects/pages/Homepage';
const homepage = new Homepage();

before(() => {
    cy.spinupContainer(Cypress.env('apiBaseUrl'));
    cy.deleteAllUsers(Cypress.env('apiBaseUrl'));
});
beforeEach(() => {
    homepage.visit('/');
});

describe('User creation tests',() => {
    it('Create a user successfully', () => {
        // Create random user data via faker.js package
        const userData = createRandomUser();
        homepage.elements.createUserButton().click();
        homepage.fillCreateUserForm(userData);
        cy.intercept('POST', `${Cypress.env('apiBaseUrl')}/users`).as('postUsers');
        homepage.elements.createUserModal.submitButton().click();
        homepage.elements.toastSuccess().should('contain', 'User created successfully');
        cy.wait(1500);
        cy.wait('@postUsers').then((interception) => {
            assert.equal(interception.response.statusCode, 201);
            assert.equal(interception.response.body, 'User created successfully');
            expect(interception.request.body).to.deep.eq({
                username: userData.username,
                email: userData.email,
                password: userData.password,
                firstName: userData.firstName,
                lastName: userData.lastName
            });
        });
        homepage.elements.userItemList
            .userItems()
            .its('length')
            .then((listLength) => {
                cy.log('length', listLength);
                const userIndex = listLength - 1;
                homepage.elements.userItemList.userInfo
                    .username(userIndex)
                    .should('have.text', `Username: ${userData.username}`);
                homepage.elements.userItemList.userInfo
                    .email(userIndex)
                    .should('have.text', `Email: ${userData.email}`);
                homepage.elements.userItemList.userInfo
                    .firstName(userIndex)
                    .should('have.text', `First Name: ${userData.firstName}`);
                homepage.elements.userItemList.userInfo
                    .lastName(userIndex)
                    .should('have.text', `Last Name: ${userData.lastName}`);
            });
    });
});