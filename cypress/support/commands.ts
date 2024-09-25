/// <reference types="cypress" />

Cypress.Commands.add("loginByApi", (email: string, password: string) => {
  return cy.request("POST", `${Cypress.env("SERVER_URL")}/api/auth/login`, {
    email,
    password,
  });
});

Cypress.Commands.add("removeTestUser", (email: string, role: string) => {
  return cy.request({
    method: "DELETE",
    url: `${Cypress.env("SERVER_URL")}/api/users/collaborator/remove`,
    body: [
      {
        email,
        role,
      },
    ],
    failOnStatusCode: false,
  });
});
