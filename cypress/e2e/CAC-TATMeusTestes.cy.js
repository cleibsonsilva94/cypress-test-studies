describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('CT 001 preenche os campos obrigatórios e envia o formulário', () => {
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
    cy.get('.button').click()

    cy.get('.success')
  })

  it('CT 002 Escrevendo uma mensagem de feedback com muitos caracteres para testar o delay.', () => {
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Lima e Silva Filho')
    cy.get('#email').type('walmyr@talkingabouttesting.com')
    cy.get('#open-text-area').type('Digno és, Senhor, de receber glória, e honra, e poder; porque tu criaste todas as coisas, e por tua vontade são e foram criadas', { delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get('.success')

  })

  it('CT 003 Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida.', () => {
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Lima e Silva Filho')
    cy.get('#email').type('walmyr.talkingabouttesting')
    cy.get('#open-text-area').type('Digno és, Senhor, de receber glória, e honra, e poder; porque tu criaste todas as coisas, e por tua vontade são e foram criadas', { delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get('.error')
  })
  it.only('Validação do campo "telefone": inserção de strings em vez de números"', () => {
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Lima e Silva Filho')
    cy.get('#email').type('walmyr@talkingabouttesting.com')
    cy.get('#phone').type('abc')
    cy.get('input').should('not.have.value', 'abc')
  })
})