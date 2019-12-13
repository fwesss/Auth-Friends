/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    // login(): Chainable<Element>;
    assertHome(): Chainable<Element>;
    assertFriendsList(): Chainable<Element>;
    assertLoggedIn(): Chainable<Element>;
  }
}
