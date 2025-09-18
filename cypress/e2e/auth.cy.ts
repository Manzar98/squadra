describe('User Signup & Login Flow', () => {
    const uniqueEmail = `testuser_${Date.now()}@example.com`;
    const duplicateEmail = `dupuser_${Date.now()}@example.com`;
    const password = 'Password123!';
  
    before(() => {
      // Ensure clean state
      cy.task('deleteUserCompletely', { email: uniqueEmail });
      cy.task('deleteUserCompletely', { email: duplicateEmail });
    });
  
    after(() => {
      // Cleanup all created users
      cy.task('deleteUserCompletely', { email: uniqueEmail });
      cy.task('deleteUserCompletely', { email: duplicateEmail });
    });
  
    context('Signup Flow', () => {
      it('shows validation error when required fields are missing', () => {
        cy.visit('/signup');
        cy.contains('button', 'SUBMIT').click();
  
        cy.contains('Missing Fields').should('be.visible');
      });
  
      it('signs up successfully and shows check email screen', () => {
        cy.visit('/signup');
        cy.get('[data-testid="name"]').type('John Doe');
        cy.get('[data-testid="email"]').type(uniqueEmail);
        cy.get('[data-testid="password"]').type(password);
        cy.get('[data-testid="team-name"]').type('Test Team');
        cy.contains('Select your role').click();
        cy.contains('Admin').click();
  
        cy.contains('button', 'SUBMIT').click();
  
        cy.contains('Signup Successful!').should('be.visible');
        cy.contains('Check your email!').should('be.visible');

        // Confirm the user to allow subsequent login tests
        cy.task('confirmUserByEmail', { email: uniqueEmail });
  
        cy.contains('button', 'Continue').click();
        cy.location('pathname').should('eq', '/');
      });
  
      it('prevents signup with a duplicate email and shows error', () => {
        // First signup with duplicateEmail
        cy.visit('/signup');
        cy.get('[data-testid="name"]').type('Alice');
        cy.get('[data-testid="email"]').type(duplicateEmail);
        cy.get('[data-testid="password"]').type(password);
        cy.get('[data-testid="team-name"]').type('Team One');
        cy.contains('Select your role').click();
        cy.contains('Admin').click();
        cy.contains('button', 'SUBMIT').click();
        cy.contains('Signup Successful!').should('be.visible');

        // Confirm duplicateEmail account to enable login tests
        cy.task('confirmUserByEmail', { email: duplicateEmail });
  
        // Attempt second signup with same email
        cy.visit('/signup');
        cy.get('[data-testid="name"]').type('Bob');
        cy.get('[data-testid="email"]').type(duplicateEmail);
        cy.get('[data-testid="password"]').type(password);
        cy.get('[data-testid="team-name"]').type('Team Two');
        cy.contains('Select your role').click();
        cy.contains('Admin').click();
        cy.contains('button', 'SUBMIT').click();
  
        cy.contains('Signup Failed').should('be.visible');
        cy.contains('User already registered with this email.').should('be.visible');
      });
    });
  
    context('Login Flow (with user created in Signup)', () => {
      it('shows validation error when required fields are missing', () => {
        cy.visit('/login');
        cy.contains('button', 'SIGN IN').click();
  
        cy.contains('Email is required').should('be.visible');
        cy.contains('Password is required').should('be.visible');
      });

      it('signs in successfully and redirects to dashboard for the first time', () => {
        cy.visit('/login');
        cy.get('[data-testid="email"]').type(uniqueEmail);
        cy.get('[data-testid="password"]').type(password);
        cy.contains('button', 'SIGN IN').click();
      
        // ✅ wait for redirect
        cy.url().should('include', '/dashboard');
        cy.contains('👋 Welcome!', { timeout: 15000 }).should('be.visible');
      });

  
      it('signs in successfully and redirects to mastery-zones on returning login', () => {
        // First login to set last_sign_in_at
        cy.visit('/login');
        cy.get('[data-testid="email"]').type(duplicateEmail);
        cy.get('[data-testid="password"]').type(password);
        cy.contains('button', 'SIGN IN').click();
        // Assert any dashboard component rendered
        cy.contains('👋 Welcome!', { timeout: 15000 }).should('be.visible');
  
        cy.clearCookies();
        cy.clearLocalStorage();
  
        // Second login should redirect to mastery-zones
        cy.visit('/login');
        cy.get('[data-testid="email"]').type(duplicateEmail);
        cy.get('[data-testid="password"]').type(password);
        cy.contains('button', 'SIGN IN').click();
        // Assert mastery-zones component heading renders
        cy.contains('Your Mastery Zones', { timeout: 15000 }).should('be.visible');
      });
    });
  });
  