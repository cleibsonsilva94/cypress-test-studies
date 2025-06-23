describe('CT001 Central de Atendimento ao Cliente TAT', () => {
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
  it('CT002 Escrevendo uma mensagem de feedback com muitos caracteres para testar o delay.', () => {
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Lima e Silva Filho')
    cy.get('#email').type('walmyr@talkingabouttesting.com')
    cy.get('#open-text-area').type('Digno és, Senhor, de receber glória, e honra, e poder; porque tu criaste todas as coisas, e por tua vontade são e foram criadas', { delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get('.success')
  })

  it('CT003 Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida.', () => {
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Lima e Silva Filho')
    cy.get('#email').type('walmyr.talkingabouttesting')
    cy.get('#open-text-area').type('Digno és, Senhor, de receber glória, e honra, e poder; porque tu criaste todas as coisas, e por tua vontade são e foram criadas', { delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get('.error')
  })
  it('CT004 Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário"', () => {
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Lima e Silva Filho')
    cy.get('#email').type('walmyr@talkingabouttesting.com')
    cy.get('#phone-checkbox').click()
    cy.get('button[type="submit"]').click()

    cy.get('.error')
  })
  it('CT005 Validação do campo "telefone": inserção de strings em vez de números"', () => {
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Lima e Silva Filho')
    cy.get('#email').type('walmyr@talkingabouttesting.com')
    cy.get('#phone').type('abc')

    cy.get('input').should('not.have.value', 'abc')
  })
  it.only('CT006 Verifica se os campos do formulário são apagados corretamente.', () => {
    cy.get('#firstName').type('WA').should('have.value', 'WA').clear().should('not.have.value', 'WA').type('Walmyr').should('have.value', 'Walmyr')
    cy.get('#lastName').type('lima e silva filho').should('have.value', 'lima e silva filho').clear().should('not.have.value', 'lima e silva filho').type('Lima e Silva Filho').should('have.value', 'Lima e Silva Filho')
    cy.get('#email').type('WALMYE@talkingabouttesting.com').should('have.value', 'WALMYE@talkingabouttesting.com').clear().should('not.have.value', 'WALMYE@talkingabouttesting.com').type('walmye@talkingabouttesting.com').should('have.value', 'walmye@talkingabouttesting.com')
    cy.get('#phone').type('123456789').should('have.value', '123456789').clear().should('not.have.value', '123456789').type('897654321').should('have.value', '897654321')

  })

})


/*
Sugestão de outra abordagem para o CT006: basicamente, separar as interações por campo para melhorar a legibilidade.
it.only('CT006 - Verifica se os campos do formulário podem ser apagados e reescritos.', () => {
  // Primeiro Nome
  cy.get('#firstName')
    .type('WA')
    .should('have.value', 'WA')
    .clear()
    .should('have.value', '') // mais direto
    .type('Walmyr')
    .should('have.value', 'Walmyr')

  // Sobrenome
  cy.get('#lastName')
    .type('lima e silva filho')
    .should('have.value', 'lima e silva filho')
    .clear()
    .should('have.value', '')
    .type('Lima e Silva Filho')
    .should('have.value', 'Lima e Silva Filho')

  // E-mail
  cy.get('#email')
    .type('WALMYE@talkingabouttesting.com')
    .should('have.value', 'WALMYE@talkingabouttesting.com')
    .clear()
    .should('have.value', '')
    .type('walmye@talkingabouttesting.com')
    .should('have.value', 'walmye@talkingabouttesting.com')

  // Telefone
  cy.get('#phone')
    .type('123456789')
    .should('have.value', '123456789')
    .clear()
    .should('have.value', '')
    .type('897654321')
    .should('have.value', '897654321')

Uma boa prática também é usar uma função para isso e deixá-la na mesma classe ou em um arquivo separado, dependendo da organização do proj
    
})

export function preencherApagarPreencher(selector, valor1, valor2) {
  cy.get(selector)
    .type(valor1)
    .should('have.value', valor1)
    .clear()
    .should('have.value', '')
    .type(valor2)
    .should('have.value', valor2)
}

*/