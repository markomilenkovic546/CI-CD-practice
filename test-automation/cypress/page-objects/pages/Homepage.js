/// <reference types="Cypress" />
import BasePage from '../pages/BasePage';

export default class Homepage extends BasePage {
    constructor() {
        super();
        this.elements = {
            pageTitle: () => cy.get('h1'),
            createUserButton: () => cy.get('[data-cy="open-modal"]'),
            toastNotification: () => cy.get('.toast.toast-error'),
            userItemList: {
                userItems: () => cy.get('.user-info'),
                userItem: (index) => this.elements.userItemList.userItems().eq(index),
                userInfo: {
                    username: (index) =>
                        this.elements.userItemList
                            .userItem(index)
                            .find('p:contains("Username:")'),
                    email: (index) =>
                        this.elements.userItemList
                            .userItem(index)
                            .find('p:contains("Email:")'),
                    firstName: (index) =>
                        this.elements.userItemList
                            .userItem(index)
                            .find('p:contains("First Name:")'),
                    lastName: (index) =>
                        this.elements.userItemList
                            .userItem(index)
                            .find('p:contains("Last Name:")')
                }
            },
            createUserModal: {
                modal: () => cy.get('.modal-content'),
                modalTitle: () => this.elements.createUserModal.modal().find('h2'),
                closeModalButton: () =>
                    this.elements.createUserModal.modal().find('#close-modal'),
                usernameField: () =>
                    this.elements.createUserModal
                        .modal()
                        .find('[data-cy="username-input"]'),
                emailField: () =>
                    this.elements.createUserModal
                        .modal()
                        .find('[data-cy="email-input"]'),
                passwordField: () =>
                    this.elements.createUserModal
                        .modal()
                        .find('[data-cy="password-input"]'),
                firstNameField: () =>
                    this.elements.createUserModal
                        .modal()
                        .find('[data-cy="first-name-input"]'),
                lastNameField: () =>
                    this.elements.createUserModal
                        .modal()
                        .find('[data-cy="last-name-input"]'),
                submitButton: () =>
                    this.elements.createUserModal
                        .modal()
                        .find('[data-cy="submit-button"]')
            }
        };
    }
}
