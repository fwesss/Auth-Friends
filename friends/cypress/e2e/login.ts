describe('login', () => {
  it('should login a user "Lambda School" with password "i<3Lambd4" and authentication should persist on refresh', function() {
    cy.visit('/')
      .findByText(/login/i)
      .click()
      .findByLabelText(/username/i)
      .type('Lambda School')
      .findByLabelText(/password/i)
      .type('i<3Lambd4')
      .findByText(/submit/i)
      .click()
      .assertFriendsList()
      .assertLoggedIn()
      .visit('/')
      .assertLoggedIn();
  });
});
