describe('login', () => {
  it('should login an existing user', function() {
    cy.visit('/')
      .findByText(/login/i)
      .click()
      .findByLabelText(/username/i)
      .type('Lambda School')
      .findByLabelText(/password/i)
      .type('i<3Lambd4')
      .findByText(/submit/i)
      .click();
  });
});
