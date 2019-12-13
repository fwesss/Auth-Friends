/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    // login(): Chainable<Element>;
    assertFriendsList(): Chainable<Element>;
    assertLoggedIn(): Chainable<Element>;
  }
}
