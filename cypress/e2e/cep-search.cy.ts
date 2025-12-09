describe('Feature: Address Search by ZIP Code', () => {
  beforeEach(() => {
    cy.login('guilhermeee314@gmail.com', 'Chico$314');
    cy.visit('/cep');
    cy.url().should('include', '/cep');
  });

  context('Successful search for valid ZIP code', () => {
    it('Given the user is on the ZIP code search page', () => {
      cy.contains('Busca de CEP').should('be.visible');
      cy.get('[data-cy="cep-input"]').should('be.visible');
      cy.get('[data-cy="search-cep-button"]').should('be.visible');
    });

    it('When the user enters a valid ZIP code and clicks search', () => {
      cy.get('[data-cy="cep-input"]')
        .type('01310100')
        .should('have.value', '01310-100');

      cy.get('[data-cy="search-cep-button"]')
        .should('not.be.disabled')
        .click();
    });

    it('Then the system should display the complete found address', () => {
      cy.get('[data-cy="cep-input"]').type('01310100');
      cy.get('[data-cy="search-cep-button"]').click();

      cy.get('[data-cy="address-card"]', { timeout: 10000 }).should('be.visible');
      cy.contains('Endereço Encontrado').should('be.visible');

      cy.get('[data-cy="address-cep"]').should('be.visible').and('not.be.empty');
      cy.get('[data-cy="address-logradouro"]').should('be.visible');
      cy.get('[data-cy="address-city"]').should('be.visible').and('not.be.empty');
      cy.get('[data-cy="address-state"]').should('be.visible').and('not.be.empty');

      cy.contains('CEP encontrado com sucesso!', { timeout: 3000 }).should('be.visible');
    });
  });

  context('Search for invalid or not found ZIP code', () => {
    it('Given the user is on the ZIP code search page', () => {
      cy.contains('Busca de CEP').should('be.visible');
    });

    it('When the user enters an invalid ZIP code (00000-000) and searches', () => {
      cy.get('[data-cy="cep-input"]').type('00000000');
      cy.get('[data-cy="search-cep-button"]').click();
    });

    it('Then the system should display an error message informing that the ZIP code was not found', () => {
      cy.get('[data-cy="cep-input"]').type('00000000');
      cy.get('[data-cy="search-cep-button"]').click();

      cy.contains('CEP não encontrado', { timeout: 5000 }).should('be.visible');

      cy.get('[data-cy="address-card"]').should('not.exist');
    });
  });

  context('Validation of ZIP code with incorrect format', () => {
    it('Given the user is on the ZIP code search page', () => {
      cy.contains('Busca de CEP').should('be.visible');
    });

    it('When the user enters a ZIP code with less than 8 digits and tries to search', () => {
      cy.get('[data-cy="cep-input"]').type('12345');
      cy.get('[data-cy="search-cep-button"]').should('be.disabled');
    });

    it('Then the system should prevent the search and display a validation message', () => {
      cy.get('[data-cy="cep-input"]').type('12345');
      cy.get('form').submit();

      cy.contains('CEP deve conter 8 dígitos', { timeout: 3000 }).should('be.visible');
      cy.get('[data-cy="address-card"]').should('not.exist');
    });
  });

  context('Validation of empty ZIP code', () => {
    it('Given the user is on the ZIP code search page', () => {
      cy.contains('Busca de CEP').should('be.visible');
    });

    it('When the user tries to search without entering any ZIP code', () => {
      cy.get('[data-cy="cep-input"]').should('have.value', '');
      cy.get('[data-cy="search-cep-button"]').should('be.disabled');
    });

    it('Then the system should prevent the search by keeping the button disabled', () => {
      cy.get('[data-cy="search-cep-button"]').should('be.disabled');
      cy.get('[data-cy="address-card"]').should('not.exist');
    });
  });
});

