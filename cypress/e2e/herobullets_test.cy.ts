describe("template spec", () => {
  it("passes", () => {
    cy.visit(`${Cypress.env("localhost")}/`);

    cy.get('[data-testid="cypress-hero-bullets"]').should("exist");
  });
});
