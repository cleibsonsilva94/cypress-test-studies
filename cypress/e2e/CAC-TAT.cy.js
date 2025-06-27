// Comando para rodar: npm run cy:open

describe('Central de Atendimento ao Cliente TAT', () => {
  // Executa antes de cada teste, garantindo ambiente limpo
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('CT001 - Deve preencher os campos obrigatórios e enviar o formulário com sucesso', () => {
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Lima e Silva Filho')
    cy.get('#email').type('walmyr@talkingabouttesting.com')
    cy.get('#open-text-area').type('Obrigado!')
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  it('CT002 - Deve enviar mensagem com muitos caracteres no campo de feedback', () => {
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Lima e Silva Filho')
    cy.get('#email').type('walmyr@talkingabouttesting.com')
    cy.get('#open-text-area')
      .type(
        'Digno és, Senhor, de receber glória, e honra, e poder; porque tu criaste todas as coisas, e por tua vontade são e foram criadas',
        { delay: 0 }
      )
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  it('CT003 - Deve preencher os campos obrigatórios com texto longo e enviar o formulário', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)

    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Lima e Silva Filho')
    cy.get('#email').type('walmyr@talkingabouttesting.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  it('CT004 - Deve manter o campo telefone vazio ao digitar caracteres não numéricos', () => {
    cy.get('#phone')
      .type('abcdef')
      .should('have.value', '')
  })

  it('CT005 - Deve preencher e limpar os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Walmyr')
      .should('have.value', 'Walmyr')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Lima e Silva Filho')
      .should('have.value', 'Lima e Silva Filho')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('walmyr@talkingabouttesting.com')
      .should('have.value', 'walmyr@talkingabouttesting.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '')
  })
})

/*
Explicações sobre hooks do Cypress:

before(() => {...})
→ Executa uma única vez antes de todos os testes.
→ Ideal para configurações iniciais globais.

beforeEach(() => {...})
→ Executa antes de cada teste individual.
→ Garante que os testes comecem do zero.

afterEach(() => {...})
→ Executa após cada teste.
→ Útil para limpezas ou verificações pós-teste.

after(() => {...})
→ Executa uma única vez após todos os testes.
→ Ideal para encerramentos, relatórios, etc.
*/