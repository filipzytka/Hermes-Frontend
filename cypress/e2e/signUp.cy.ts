before(() => {
  cy.session("register", () => {
    cy.loginByApi(Cypress.env("EMAIL"), Cypress.env("PASSWORD")).then(
      (response) => {
        expect(response.status).to.eq(200);
      }
    );
  });
  cy.removeTestUser(Cypress.env("TEST_EMAIL"), "collaborator");
});

it("should create new account after submitting register form", () => {
  cy.visit(`/register?token=${Cypress.env("TEST_TOKEN")}`);
  cy.get('[data-cy="email-input"]').type(Cypress.env("TEST_EMAIL"));
  cy.get('[data-cy="password-input"]').type(Cypress.env("PASSWORD"));
  cy.intercept("POST", `${Cypress.env("SERVER_URL")}/api/users/register`).as(
    "register"
  );
  cy.get('[data-cy="signUp_submit"]').click();
  cy.wait("@register").its("response.statusCode").should("eq", 200);
});
