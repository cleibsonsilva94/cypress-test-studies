// Comando para rodar: npm run cy:open obs
// Primeiro exercício feito por mim após ler a documentação
describe('Central de Atendimento ao Cliente TAT', () => { // Suíte de testes

  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Lima e Silva Filho')
    cy.get('#email').type('walmyr@talkingabouttesting.com')
    cy.get('#open-text-area').type('Obrigado!')
    cy.get('button[type="submit"]').click()

    cy.get('.success')
  })

  it('Escrevendo uma mensagem de feedback com muitos caracteres para testar o delay.', () => {
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Lima e Silva Filho')
    cy.get('#email').type('walmyr@talkingabouttesting.com')
    cy.get('#open-text-area').type('Digno és, Senhor, de receber glória, e honra, e poder; porque tu criaste todas as coisas, e por tua vontade são e foram criadas', {delay:0})
    cy.get('button[type="submit"]').click()

    cy.get('.success')

  })

  // Código do professor para CT003
it.only('preenche os campos obrigatórios e envia o formulário', () => {
  const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10) // Função que repete um texto várias vezes. É praticamente a única diferença entre meu teste e o do professor.

  cy.get('#firstName').type('Walmyr')
  cy.get('#lastName').type('Lima e Silva Filho')
  cy.get('#email').type('walmyr@talkingabouttesting.com')
  cy.get('#open-text-area').type(longText, { delay: 0 })
  cy.get('button[type="submit"]').click()

  cy.get('.success').should('be.visible') // Também é diferente: verifica se o elemento está visível.
})

})


/*
before(() => {...})
Executa uma única vez antes de todos os testes.
Ideal para configurações gerais, como abrir o sistema, carregar dados de teste, limpar banco de dados etc.

beforeEach(() => {...})
Executa antes de cada teste individual.
Útil para garantir que cada teste comece do zero, sem interferência do anterior.

afterEach(() => {...})
Executa após cada teste individual.
Serve para limpar ou verificar o estado após o teste (ex: excluir dados temporários, gerar logs).

after(() => {...})
Executa uma única vez após todos os testes.
Ideal para fechar conexões, gerar relatórios ou encerrar sessões.
*/