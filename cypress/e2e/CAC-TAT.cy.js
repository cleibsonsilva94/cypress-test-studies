// Primeiro exercício feito por mim após ler a documentação
beforeEach(() => {
  cy.visit('./src/index.html')
})

describe('Central de Atendimento ao Cliente TAT', () => { // Suíte de testes
  it('verifica o título da aplicação', () => { // Caso de teste sempre definido por "it"
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT') // O primeiro argumento do "should" é o comando, como "be.equal". Para negar uma asserção, podemos usar "not" antes do comando. :)
  })

  it('Elogiando', () => {
    // Digitando o primeiro nome
    cy.get('input[name="firstName"]')
      .as('firstNameField')
      .should('be.visible')
      .type('Cleibson')
    cy.get('@firstNameField').should('have.value', 'Cleibson')

    // Digitando o sobrenome
    cy.get('input[name="lastName"]')
      .as('lastNameField')
      .should('be.visible')
      .type('Lima')
    cy.get('@lastNameField').should('have.value', 'Lima')

    // Digitando o email
    cy.get('input[id="email"]')
      .as('emailField')
      .should('be.visible')
      .type('cleibson@gmail.com')
    cy.get('@emailField').should('have.value', 'cleibson@gmail.com')

    // Digitando o telefone
    cy.get('input[id="phone"]')
      .as('phonelField')
      .should('be.visible')
      .type('93187771')
    cy.get('@phonelField').should('have.value', '93187771')

    // Clicando na opção de elogio e escolhendo ser contatado por telefone
    cy.get('input[value="elogio"]').click()

    // Digitando a mensagem de elogio
    cy.get('textarea[id="open-text-area"]')
      .as('elogiolField')
      .should('be.visible')
      .type('Botafogo venceu')
    cy.get('@elogiolField').should('have.value', 'Botafogo venceu')

    // Enviando o formulário
    cy.get('button[type="submit"]').click().should('have.value', 'Mensagem enviada com sucesso.')
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