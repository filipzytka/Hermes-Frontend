beforeEach(() => {
  cy.visit(`/login`);
});

it("should show validation errors when email is in a wrong format", () => {
  cy.get('[data-cy="email-input"]').type("abcdgmail.com");
  cy.get('[data-cy="error-submit-email"]').should(
    "have.text",
    "Invalid email format"
  );
});

it("should show validation errors when typing password with less than 8 characters", () => {
  cy.get('[data-cy="password-input"]').type("Abc2");
  cy.get('[data-cy="error-submit-password"]').should(
    "have.text",
    "Password must be at least 8 characters long"
  );

  cy.get('[data-cy="signin_submit"]').click();
});

it("should show validation errors when typing password which does not contain both letters and numbers", () => {
  cy.get('[data-cy="password-input"]').type("abcdefghijk");
  cy.get('[data-cy="error-submit-password"]').should(
    "have.text",
    "Password must contain both letters and numbers"
  );
});
