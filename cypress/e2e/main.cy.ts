describe("main page", () => {
  it("should dashboard link be not visible when not signed in", () => {
    cy.visit(`${Cypress.env("LOCALHOST")}`);

    cy.get('[data-cy="link-dashboard"]').should("not.exist");
  });
});
