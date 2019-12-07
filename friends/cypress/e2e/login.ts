describe('login', () => {
  it('should login a user "Lambda School" with password "i<3Lambd4"', function() {
    cy.visit('/')
      .findByText(/login/i)
      .click()
      .findByLabelText(/username/i)
      .type('Lambda School')
      .findByLabelText(/password/i)
      .type('i<3Lambd4')
      .findByText(/submit/i)
      .click()
      .url()
      .should('eq', `${Cypress.config().baseUrl}/FriendsList`)
      .window()
      .its('localStorage.token')
      .should('be.a', 'string');
  });
});
