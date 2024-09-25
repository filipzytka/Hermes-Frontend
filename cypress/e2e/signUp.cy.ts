const testEmail = `${Cypress.env("TEST_EMAIL")}`;
const password = `${Cypress.env("PASSWORD")}`;

before(() => {
  cy.session("register", () => {
    const email = `${Cypress.env("EMAIL")}`;

    cy.loginByApi(email, password).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  cy.removeTestUser(testEmail, "collaborator");
});

it("should create new account after submitting register form", () => {
  const testToken = `${Cypress.env("TEST_TOKEN")}`;
  const registerUrl = `${Cypress.env("LOCALHOST")}/register?token=${testToken}`;

  cy.visit(registerUrl);

  cy.wait(5000);
  cy.get('[data-cy="email-input"]').type(testEmail);
  cy.get('[data-cy="password-input"]').type(password);

  cy.intercept("POST", `${Cypress.env("SERVER_URL")}/api/users/register`).as(
    "register"
  );

  cy.get('[data-cy="signUp_submit"]').click();

  cy.wait("@register").its("response.statusCode").should("eq", 200);
});
