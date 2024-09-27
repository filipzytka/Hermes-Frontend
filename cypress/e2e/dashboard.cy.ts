beforeEach(() => {
  cy.session("login", () => {
    cy.loginByApi(Cypress.env("EMAIL"), Cypress.env("PASSWORD")).then(
      (response) => {
        expect(response.status).to.eq(200);
      }
    );
  });
});

it("should show validation errors when invitation modal input is wrong", () => {
  cy.visit(`/admin/dashboard/collab`);
  cy.get('[data-cy="add-button"]').click();
  cy.get('[data-cy="email-input"]').type("Abc2");
  cy.get('[data-cy="error-submit-email"]').should("not.have.text", undefined);
});

it("should send email when clicking on send button in invitation modal", () => {
  cy.visit(`/admin/dashboard/collab`);
  cy.get('[data-cy="add-button"]').click();

  cy.intercept("POST", `${Cypress.env("SERVER_URL")}/api/email`).as(
    "sendEmail"
  );

  cy.get('[data-cy="email-input"]').type(`${Cypress.env("INV_EMAIL")}`);
  cy.get('[data-cy="inv-button-send"]').click();

  cy.wait("@sendEmail").its("response.statusCode").should("eq", 200);
});
