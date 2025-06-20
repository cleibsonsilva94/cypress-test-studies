it('preenche os campos obrigatórios e envia o formulário', () => {
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

  
