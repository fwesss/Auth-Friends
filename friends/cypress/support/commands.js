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
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Cypress.Commands.add('login', () => {
//   const user = {
//     username: 'Lambda School',
//     password: 'i<3Lambd4',
//   };
//
//   return cy
//     .request({
//       url: 'http://localhost:5000/api/login',
//       method: 'POST',
//       body: user,
//     })
//     .then((response) => {
//       window.localStorage.setItem('token', response.body.payload);
//       return { ...response.body.user, ...user };
//     });
// });

Cypress.Commands.add('assertFriendsList', () => {
  cy.url().should('eq', `${Cypress.config().baseUrl}/FriendsList`);
});

Cypress.Commands.add('assertLoggedIn', () => {
  cy.window()
    .its('localStorage.token')
    .should('be.a', 'string');
});
