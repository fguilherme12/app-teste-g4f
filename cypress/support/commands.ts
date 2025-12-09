/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.session(
    [email, password],
    () => {
      cy.visit('/login');
      cy.get('input[type="email"]').type(email);
      cy.get('input[type="password"]').type(password);
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/home');
      
      cy.window().then((win) => {
        expect(win.localStorage.getItem('access_token')).to.exist;
      });
    },
    {
      validate: () => {
        cy.window().then((win) => {
          const token = win.localStorage.getItem('access_token');
          if (!token) {
            throw new Error('Token não encontrado');
          }
        });
      },
    }
  );
});

export {};

