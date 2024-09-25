/// <reference types="cypress" />

Cypress.Commands.add("loginByApi", (email: string, password: string) => {
  return cy.request("POST", `http://localhost:8080/api/auth/login`, {
    email,
    password,
  });
});

Cypress.Commands.add("removeTestUser", (email: string, role: string) => {
  return cy.request({
    method: "DELETE",
    url: `http://localhost:8080/api/users/collaborator/remove`,
    body: [
      {
        email,
        role,
      },
    ],
    failOnStatusCode: false,
  });
});
