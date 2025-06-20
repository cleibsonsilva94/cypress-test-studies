// Primeiro exercício feito por mim após ler a documentação

describe('Central de Atendimento ao Cliente TAT', () => { // Suíte de testes
  it('verifica o título da aplicação', () => { // Caso de teste sempre definido por "it"
    cy.visit('./src/index.html')
    cy.title().should('not.be.equal', 'Central de Atendimento ao Cliente TAT') // O primeiro argumento do "should" é o comando, como "be.equal". Para negar uma asserção, podemos usar "not" antes do comando :)
  })
})
