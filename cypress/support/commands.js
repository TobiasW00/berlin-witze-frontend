Cypress.Commands.add('login', (email,password) => {

    cy.visit('http://localhost:3000/login');
    cy.get('#email')
    .type(email)
    .should('have.value', email)

    cy.get('#passwordfield')
    .type(password)
    .should('have.value', password)

    cy.get('.loginblock').contains('Login').click();
    cy.get('.swal-button--confirm').contains('OK').click();

});

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
