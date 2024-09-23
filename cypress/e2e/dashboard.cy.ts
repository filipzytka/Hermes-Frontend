beforeEach(() => {
  cy.session("login", () => {
    cy.visit(`${Cypress.env("LOCALHOST")}/login`);

    cy.get('[data-cy="email-input"]').type(Cypress.env("EMAIL"));
    cy.get('[data-cy="password-input"]').type(Cypress.env("PASSWORD"));

    cy.get('[data-cy="signin_submit"]').click();

    cy.wait(100);
    cy.document().its("cookie").should("contain", "active");
  });
});

it("should show validation errors when invitation modal input is wrong", () => {
  cy.visit(`${Cypress.env("LOCALHOST")}/admin/dashboard/collab`);
  cy.get('[data-cy="add-button"]').click();
  cy.get('[data-cy="inv-modal-input"]').type("Abc2");

  cy.get('[data-cy="error-submit-email"]').should("not.have.text", undefined);
});

it("should send email when clicking on send button in invitation modal", () => {
  cy.visit(`${Cypress.env("LOCALHOST")}/admin/dashboard/collab`);
  cy.get('[data-cy="add-button"]').click();

  cy.intercept("POST", `${Cypress.env("SERVER_URL")}/api/email`).as(
    "sendEmail"
  );

  cy.get('[data-cy="inv-modal-input"]').type(`${Cypress.env("INV_EMAIL")}`);

  cy.get('[data-cy="inv-button-send"]').click();

  cy.wait("@sendEmail").its("response.statusCode").should("eq", 200);
});

it("should send email when clicking on send button in invitation modal", () => {
  cy.visit(`${Cypress.env("LOCALHOST")}/admin/dashboard/collab`);
  cy.get('[data-cy="add-button"]').click();

  cy.intercept("POST", `${Cypress.env("SERVER_URL")}/api/email`).as(
    "sendEmail"
  );

  cy.get('[data-cy="inv-modal-input"]').type(`${Cypress.env("INV_EMAIL")}`);

  cy.get('[data-cy="inv-button-send"]').click();

  cy.wait("@sendEmail").its("response.statusCode").should("eq", 200);
});
