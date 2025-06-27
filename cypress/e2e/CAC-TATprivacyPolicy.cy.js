
it('CT001- Deve acessar a página de política de privacidade removendo o target e clicando', () => {
    cy.visit('./src/privacy.html')
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })