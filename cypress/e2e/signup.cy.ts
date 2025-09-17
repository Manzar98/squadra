describe('Signup Flow', () => {
  const uniqueEmail = `testuser_${Date.now()}@example.com`;
  const duplicateEmail = `dupuser_${Date.now()}@example.com`;
  const password = 'Password123!';

  before(() => {
    cy.task('deleteUserCompletely', { email: uniqueEmail });
    cy.task('deleteUserCompletely', { email: duplicateEmail });
  });

  after(() => {
    cy.task('deleteUserCompletely', { email: uniqueEmail });
    cy.task('deleteUserCompletely', { email: duplicateEmail });
  });

  it('shows validation error when required fields are missing', () => {
    cy.visit('/signup');

    // Submit without filling anything
    cy.contains('button', 'SUBMIT').click();

    // Expect toast error for missing fields
    cy.contains('Signup Failed').should('not.exist');
    cy.contains('Missing Fields').should('be.visible');
  });

  it('signs up successfully and shows check email screen', () => {
    cy.visit('/signup');

    cy.get('[data-testid="name"]').type('John Doe');
    cy.get('[data-testid="email"]').type(uniqueEmail);
    cy.get('[data-testid="password"]').type(password);
    cy.get('[data-testid="team-name"]').type('Test Team');

    // Select role from custom dropdown
    cy.contains('Select your role').click();
    cy.contains('Admin').click();

    // Submit
    cy.contains('button', 'SUBMIT').click();

    // Success toast and Check Email screen
    cy.contains('Signup Successful!').should('be.visible');
    cy.contains('Check your email!').should('be.visible');

    // Continue redirects to home
    cy.contains('button', 'Continue').click();
    cy.location('pathname').should('eq', '/');
  });

  it('prevents signup with a duplicate email and shows error', () => {
    // First signup
    cy.visit('/signup');
    cy.get('[data-testid="name"]').type('Alice');
    cy.get('[data-testid="email"]').type(duplicateEmail);
    cy.get('[data-testid="password"]').type(password);
    cy.get('[data-testid="team-name"]').type('Team One');
    cy.contains('Select your role').click();
    cy.contains('Admin').click();
    cy.contains('button', 'SUBMIT').click();
    cy.contains('Signup Successful!').should('be.visible');

    // Attempt duplicate signup
    cy.visit('/signup');
    cy.get('[data-testid="name"]').type('Bob');
    cy.get('[data-testid="email"]').type(duplicateEmail); // same email
    cy.get('[data-testid="password"]').type(password);
    cy.get('[data-testid="team-name"]').type('Team Two');
    cy.contains('Select your role').click();
    cy.contains('Admin').click();
    cy.contains('button', 'SUBMIT').click();

    // Error toast from duplicate email check
    cy.contains('Signup Failed').should('be.visible');
    cy.contains('User already registered with this email.').should('be.visible');
  });
});
  