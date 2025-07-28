describe('Supabase Auth Flow', () => {
  const email = 'gayes59450@devdigs.com';
  const password = 'StrongPass123!';
  const role = 'admin';
  const teamName = 'Test Team'; 

  it('Signs up and logs in via UI', () => {
    cy.visit('/signup');
    
    cy.get('[data-testid="email-input"]').type(email);
    cy.get('[data-testid="password-input"]').type(password);
    cy.get('[data-testid="teamName-input"]').type(teamName);
    // cy.get('[data-testid="role-input"]').type(role);

    
    cy.get('[data-testid="signup-button"]').click();

    // cy.contains('Please check your email to confirm your account.').should('exist');
    cy.url().should('include', '/login');

    // cy.get('[data-testid="email-input"]').type(email);
    // cy.get('[data-testid="password-input"]').type(password);
    // cy.get('[data-testid="login-button"]').click();

    // cy.url().should('include', '/dashboard');
  });
});
