// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


/* ===================================
   Comandos customizados — formas
====================================== */

Cypress.Commands.add('fillInAllFieldsAndSendTheForm', (data = {
  fistName: "Pelé",
  lastName: "Lionel Cristiano Ronaldinho",
  email: "peleemelhor@12teste.com",
  text: "Cristiano Ronaldo"
}) => {
  cy.contains('label', 'Nome').type(data.fistName)
  cy.contains('label', 'Sobrenome ').type(data.lastName)
  cy.contains('label', 'E-mail').type(data.email)
  cy.contains('label', 'Algum elogio ou feedback para nós?').type(data.text, { delay: 0 })
  cy.contains('button', 'Enviar').click()
})

/*
Cypress.Commands.add('fillInAllFieldsAndSendTheForm', () => {
  cy.contains('label', 'Nome').type('Walmyr')
  cy.contains('label', 'Sobrenome ').type('Lima e Silva Filho')
  cy.contains('label', 'E-mail').type('walmyr@talkingabouttesting.com')
  cy.contains('label', 'Algum elogio ou feedback para nós?').type('Test test test test test', { delay: 0 })
  cy.contains('button', 'Enviar').click()
  })
  */