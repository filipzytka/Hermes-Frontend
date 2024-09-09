describe("sign in", () => {
  it("should show validation errors when leaving all fields blank", () => {
    cy.visit(`${Cypress.env("LOCALHOST")}/login`);

    cy.get('[data-cy="signin_submit"]').click();

    cy.get('[data-cy="error-submit-email"]')
      .should("exist")
      .should("have.text", "Email field is empty");

    cy.get('[data-cy="error-submit-password"]')
      .should("exist")
      .should("have.text", "Password field is empty");
  });

  it("should show validation errors when email is in a wrong format", () => {
    cy.visit(`${Cypress.env("LOCALHOST")}/login`);

    cy.get('[data-cy="email-input"]').type("abcdgmail.com");

    cy.get('[data-cy="error-submit-email"]')
      .should("exist")
      .should("have.text", "Invalid email format");
  });

  it("should show validation errors when typing password with less than 8 characters", () => {
    cy.visit(`${Cypress.env("LOCALHOST")}/login`);

    cy.get('[data-cy="password-input"]').type("Abc2");

    cy.get('[data-cy="error-submit-password"]')
      .should("exist")
      .should("have.text", "Password must be at least 8 characters long");

    cy.get('[data-cy="signin_submit"]').click();
  });

  it("should show validation errors when typing password which does not contain both letters and numbers", () => {
    cy.visit(`${Cypress.env("LOCALHOST")}/login`);

    cy.get('[data-cy="password-input"]').type("abcdefghijk");

    cy.get('[data-cy="error-submit-password"]')
      .should("exist")
      .should("have.text", "Password must contain both letters and numbers");
  });

  it("should redirect the user to a home page after successfull signing in", () => {
    cy.visit(`${Cypress.env("LOCALHOST")}/login`);

    cy.get('[data-cy="email-input"]').type(`${Cypress.env("EMAIL")}`);

    cy.get('[data-cy="password-input"]').type(`${Cypress.env("PASSWORD")}`);

    cy.intercept("POST", `${Cypress.env("SERVER_URL")}/api/auth/login`).as(
      "signIn"
    );

    cy.get('[data-cy="signin_submit"]').click();

    cy.wait("@signIn").its("response.statusCode").should("eq", 200);

    cy.url().should("match", /\/$/);
  });
});
