describe('Signup Flow (Real Supabase)', () => {
    const testEmail = `testuser_${Date.now()}@example.com`;
    const badPathEmail = `testuser_bad_${Date.now()}@example.com`
    const password = 'Password123!';
  
    before(() => {
        cy.task('deleteUserCompletely', { email: testEmail })
        cy.task('deleteUserCompletely', { email: badPathEmail })
      })
      
      after(() => {
        cy.task('deleteUserCompletely', { email: testEmail })
        cy.task('deleteUserCompletely', { email: badPathEmail })
      })
  
    it('should sign up successfully (good path)', () => {
      cy.visit('/signup');
  
      cy.get('[data-testid="name-input"]').type('John Doe');
      cy.get('[data-testid="email-input"]').type(testEmail);
      cy.get('[data-testid="password-input"]').type(password);
      cy.get('[data-testid="teamName-input"]').type('Test Team');
  
      // Select role
      cy.get('[data-testid="role-input"]').click();
      cy.contains('Admin').click();
  
      // Submit
      cy.get('[data-testid="signup-button"]').click();
  
      // Success message
      cy.contains('Signup Successful!').should('be.visible');
    });
  
    it('should fail with duplicate email (bad path)', () => {
      // First signup
      cy.visit('/signup');
      cy.get('[data-testid="name-input"]').type('John Doe');
      cy.get('[data-testid="email-input"]').type(badPathEmail);
      cy.get('[data-testid="password-input"]').type(password);
      cy.get('[data-testid="teamName-input"]').type('Test Team');
  
      // Select role
      cy.get('[data-testid="role-input"]').click();
      cy.contains('Admin').click();
  
      // Submit
      cy.get('[data-testid="signup-button"]').click();
  
      // Success message
      cy.contains('Signup Successful!').should('be.visible');
  
      // Attempt duplicate signup
      cy.visit('/signup');
      cy.get('[data-testid="name-input"]').type('Jane Doe');
      cy.get('[data-testid="email-input"]').type(badPathEmail); // same email
      cy.get('[data-testid="password-input"]').type(password);
      cy.get('[data-testid="teamName-input"]').type('Another Team');
      cy.get('[data-testid="role-input"]').click();
      cy.contains('Admin').click();
      cy.get('[data-testid="signup-button"]').click();
  
      // Verify duplicate email error (from handleSubmit logic)
      cy.contains('Insert Failed', { timeout: 5000 }).should('be.visible');
    });
  });
  