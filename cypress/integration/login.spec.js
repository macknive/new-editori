describe('Login', () => {
  const USERNAME = 'test@test.com';
  const PASSWORD = 'password';

  // After a successful login, the user should not remain on the login page.
  it('accepts correct credentials', () => {
    cy.visit('/login');
    cy.get('.email input').type(USERNAME);
    cy.get('.password input').type(PASSWORD);
    cy.get('.login-button').click();
    cy.url().should('not.include', '/login');
  });

  // After a successful login, the user should be redirected to their workspace
  // (or, their default workspace, if they have more than one workspace).
  it('should redirect to default workspace', () => {
    cy.visit('/login');
    cy.get('.email input').type(USERNAME);
    cy.get('.password input').type(PASSWORD);
    cy.get('.login-button').click();
    cy.url().should('include', '/drink-filtered');
  });

  // If a malformed email address (e.g. testemailcom) is provided, the
  // "invalid email" message should be shown.
  it('should reject malformed email address', () => {
    cy.visit('/login');
    cy.get('.email input').type('testemailcom');
    cy.get('.email .v-messages').contains('E-mail must be valid');
  });

  // TODO: What happens when you log in with invalid credentials
  // TODO: What happens when you have tried multiple times
});
