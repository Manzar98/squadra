describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('shows validation errors for empty fields', () => {
    cy.get('[data-testid="login-button"]').click()
    cy.contains('Email is required').should('exist')
    cy.contains('Password is required').should('exist')
  })

  it('should show error message when Supabase returns error', () => {
    cy.intercept('POST', '**/token?grant_type=password', {
      statusCode: 400,
      body: {
        error: 'invalid_grant',
        error_description: 'Invalid login credentials'
      }
    })

    cy.get('[data-testid="email-input"]').type('wrong@example.com')
    cy.get('[data-testid="password-input"]').type('wrongpass')
    cy.get('[data-testid="login-button"]').click()

    cy.contains('Unexpected error occurred').should('be.visible')
  })

  it('logs in and redirects to dashboard', () => {
    // Mock Supabase login request
    cy.intercept('POST', '**/auth/v1/token?grant_type=password', {
      statusCode: 200,
      body: {
        access_token: 'fake-access-token',
        refresh_token: 'fake-refresh-token',
        expires_in: 3600,
        token_type: 'bearer',
        user: { id: 'fake-user-id', email: 'test@example.com' }
      }
    }).as('login')


    // Fill login form
    cy.get('[data-testid="email-input"]').type('test@example.com')
    cy.get('[data-testid="password-input"]').type('ValidPassword123!')
    cy.get('[data-testid="login-button"]').click()
    // cy.wait('@login')
    cy.location('pathname', { timeout: 10000 }).should('eq', '/dashboard')

  })

})
