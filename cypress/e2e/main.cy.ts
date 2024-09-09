describe("main page", () => {
  it("should show HeroBullets when entering home page", () => {
    cy.visit(`${Cypress.env("LOCALHOST")}/`);
    cy.get('[data-cy="hero-bullets"]').should("exist");
  });

  it("should show info when clicking faq sections", () => {
    cy.visit(`${Cypress.env("LOCALHOST")}/faq`);
    cy.get('[data-cy="faq"]').should("exist");
    cy.get('[data-cy="faq-item-0"').should("exist").click();
  });

  it("should navigate to given pages when clicking navbar links", () => {
    cy.visit(`${Cypress.env("LOCALHOST")}`);

    cy.get('[data-cy="link-home"]').should("exist").click();
    cy.url().should("match", /\/$/);

    cy.get('[data-cy="link-faq"]').should("exist").click();
    cy.url().should("match", /\/faq$/);

    cy.get('[data-cy="link-signin"]').should("exist").click();
    cy.url().should("match", /\/login$/);
  });

  it("should dashboard link be not visible when not signed in", () => {
    cy.visit(`${Cypress.env("LOCALHOST")}`);

    cy.get('[data-cy="link-dashboard"]').should("not.exist");
  });
});
