describe("collab-page", () => {
  it("should send email when clicking on send button in invitation modal", () => {
    cy.visit(`${Cypress.env("LOCALHOST")}/login`);

    cy.get('[data-cy="email-input"]')
      .should("exist")
      .type(`${Cypress.env("EMAIL")}`);

    cy.get('[data-cy="password-input"]')
      .should("exist")
      .type(`${Cypress.env("PASSWORD")}`);

    cy.get('[data-cy="signin_submit"]').click();

    cy.get('[data-cy="link-dashboard"]').click();
    cy.get('[data-cy="dashboard-nav-menu-item-1"]').click();

    cy.intercept("POST", `${Cypress.env("SERVER_URL")}/api/email`).as(
      "sendEmail"
    );

    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="inv-modal-input"]')
      .should("exist")
      .type(`${Cypress.env("INV_EMAIL")}`);

    cy.get('[data-cy="inv-button-send"]').click();

    cy.wait("@sendEmail").its("response.statusCode").should("eq", 200);
  });
});
