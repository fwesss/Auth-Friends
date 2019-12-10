const faker = require('faker');

describe('friends', () => {
  it('should allow a logged in user to add a friend to the friends list and then refresh the list', () => {
    const firstName = faker.name.firstName();
    const friend = {
      name: firstName.toString(),
      age: faker.random.number(105).toString(),
      email: faker.internet
        .email(firstName, null, 'lambdaschool.com')
        .toString(),
    };

    cy.visit('/')
      .findByText(/login/i)
      .click()
      .findByLabelText(/username/i)
      .type('Lambda School')
      .findByLabelText(/password/i)
      .type('i<3Lambd4')
      .findByText(/submit/i)
      .click()
      .findByText(/add friend/i)
      .click()
      .findByLabelText(/name/i)
      .type(friend.name)
      .findByLabelText(/age/i)
      .type(friend.age)
      .findByLabelText(/email/i)
      .wait(500)
      .type(friend.email)
      .findByText(/submit/i)
      .click()
      .findByText(friend.email)
      .findByLabelText(`delete-${friend.email}`)
      .click()
      .findByLabelText(friend.email)
      .should('not.exist');
  });
});
