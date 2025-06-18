// Primeiro exercício feito por mim depois de ler a documentação

describe('Central de Atendimento ao Cliente TAT', () => { // Suíte de testes
  it('verifica o título da aplicação', () => { // Caso de teste
    cy.visit('./src/index.html')
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })
})
