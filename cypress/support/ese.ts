describe('Supabase Auth Flow', () => {
  const email = 'testuser@example.com';
  const password = 'StrongPass123!';

  beforeEach(() => {
    cy.task('db:reset');
  });

  it('Signs up and logs in via UI', () => {
    cy.visit('/signup');
    cy.get('[data-testid="email-input"]').type(email);
    cy.get('[data-testid="password-input"]').type(password);
    cy.get('[data-testid="signup-button"]').click();

    cy.url().should('include', '/dashboard');
    cy.contains('Welcome');

    cy.get('[data-testid="logout-button"]').click();
    cy.url().should('include', '/login');

    cy.get('[data-testid="email-input"]').type(email);
    cy.get('[data-testid="password-input"]').type(password);
    cy.get('[data-testid="login-button"]').click();

    cy.url().should('include', '/dashboard');
  });

  it('Logs in directly using Supabase API (no UI)', () => {
    cy.supabaseLogin(email, password);
    cy.visit('/dashboard');
    cy.contains('Welcome');
  });
});
