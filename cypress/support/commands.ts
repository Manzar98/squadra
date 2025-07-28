import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  Cypress.env('NEXT_PUBLIC_SUPABASE_URL'),
  Cypress.env('NEXT_PUBLIC_SUPABASE_ANON_KEY')
);

declare global {
  namespace Cypress {
    interface Chainable {
      supabaseLogin(email: string, password: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('supabaseLogin', (email: string, password: string) => {
  cy.wrap(
    supabase.auth.signInWithPassword({ email, password }).then(({ data, error }) => {
      if (error) throw error;

      const session = data.session;
      cy.setCookie('sb-access-token', session?.access_token || '');
      cy.setCookie('sb-refresh-token', session?.refresh_token || '');
    })
  );
});

