describe("sign in", () => {
  it("should show validation errors when leaving all fields blank", () => {
    cy.visit(`${Cypress.env("localhost")}/login`);

    cy.get('[data-cy="signin_submit"]').click();

    cy.get('[data-cy="error-submit-email"]')
      .should("exist")
      .should("have.text", "Email field is empty");

    cy.get('[data-cy="error-submit-password"]')
      .should("exist")
      .should("have.text", "Password field is empty");
  });

  it("should redirect the user to a home page after successfull signing in", () => {
    cy.visit(`${Cypress.env("localhost")}/login`);

    cy.get('[data-cy="email-input"]').type(`${Cypress.env("email")}`);

    cy.get('[data-cy="password-input"]').type(`${Cypress.env("password")}`);

    cy.get('[data-cy="signin_submit"]').click();

    cy.url().should("match", /\/$/);
  });
});
