// E2E test: Home page loads and displays key UI elements

describe('Home Page', () => {
  it('should load and display the main navigation and welcome text', () => {
    cy.visit('/');
    cy.contains('Dashboard').should('exist');
    cy.contains('Welcome to your financial dashboard').should('exist');
    cy.get('header').should('exist');
    cy.get('footer').should('exist');
  });

  afterEach(function () {
    if (this.currentTest?.state === 'failed') {
      cy.document().then((doc) => {
        // Output the page HTML for debugging

        console.log(doc.documentElement.outerHTML);
      });
    }
  });
});
