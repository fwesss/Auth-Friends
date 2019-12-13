const faker = require('faker');

describe('friends', () => {
  it('should allow a logged in user to add a friend to the friends list and then refresh the list', () => {
    const firstName = faker.name.firstName();
    const friend = {
      name: firstName.toString(),
      age: faker.random.number(105).toString(),
      email: `${firstName}@ls.com`,
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
      .findByLabelText(/add friend/i)
      .click()
      .findByLabelText(/name/i)
      .wait(500)
      .type(friend.name)
      .findByLabelText(/age/i)
      .wait(500)
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
      .should('not.exist')
      .findByLabelText(/add friend/i)
      .click()
      .findByLabelText(/name/i)
      .wait(500)
      .type(friend.name)
      .findByLabelText(/age/i)
      .wait(500)
      .type(friend.age)
      .findByLabelText(/email/i)
      .wait(500)
      .type(friend.email)
      .findByText(/submit/i)
      .click()
      .findByLabelText(`edit-${friend.email}`)
      .click()
      .findByLabelText(/name/i)
      .wait(500)
      .type('*')
      .findByLabelText(/age/i)
      .wait(500)
      .type('1')
      .findByLabelText(/email/i)
      .wait(500)
      .type('p')
      .findByText(/submit/i)
      .click()
      .findByText(`${friend.name}*`)
      .findByText((str) => str.includes(`${friend.age + 1}`))
      .findByText(`${friend.email}p`);
  });
});
