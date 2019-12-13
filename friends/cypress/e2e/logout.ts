describe('logout', () => {
  it('should logout a user', function() {
    cy.visit('/')
      .findByText(/login/i)
      .click()
      .findByLabelText(/username/i)
      .type('Lambda School')
      .findByLabelText(/password/i)
      .type('i<3Lambd4')
      .findByText(/submit/i)
      .click()
      .findByText(/logout/i)
      .click()
      .findByText(/login/i);
  });
});
