Cypress.Commands.add('assertFriendsList', () => {
  cy.url().should('eq', `${Cypress.config().baseUrl}/FriendsList`);
});

Cypress.Commands.add('assertHome', () => {
  cy.url().should('eq', `${Cypress.config().baseUrl}/`);
});

Cypress.Commands.add('assertLoggedIn', () => {
  cy.window()
    .its('localStorage.token')
    .should('be.a', 'string');
});
