declare namespace Cypress {
  interface Chainable<Subject = any> {
    loginByApi(username: string, password: string): Chainable<any>;
    removeTestUser(email: string, password: string): Chainable<any>;
  }
}
