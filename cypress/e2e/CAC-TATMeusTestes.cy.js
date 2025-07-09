describe('Central de Atendimento ao Cliente TAT - Meus Testes', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('CT001 - Deve preencher todos os campos obrigatórios e enviar o formulário com sucesso', () => {
    cy.get('input[name="firstName"]').as('firstNameField').should('be.visible').type('Cleibson')
    cy.get('@firstNameField').should('have.value', 'Cleibson')

    cy.get('input[name="lastName"]').as('lastNameField').should('be.visible').type('Lima')
    cy.get('@lastNameField').should('have.value', 'Lima')

    cy.get('#email').as('emailField').should('be.visible').type('cleibson@gmail.com')
    cy.get('@emailField').should('have.value', 'cleibson@gmail.com')

    cy.get('#phone').as('phoneField').should('be.visible').type('93187771')
    cy.get('@phoneField').should('have.value', '93187771')

    cy.get('input[value="elogio"]').check()
    cy.get('#open-text-area').as('feedbackField').type('Obrigado')
    cy.get('@feedbackField').should('have.value', 'Obrigado')

    cy.get('.button').click()
    cy.get('.success').should('be.visible')

    cy.tick(4000)
    cy.get('.success').should('not.be.visible')
  })

  it('CT002 - Deve preencher mensagem longa com delay zero e exibir mensagem de sucesso', () => {
    cy.clock()
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Lima e Silva Filho')
    cy.get('#email').type('walmyr@talkingabouttesting.com')
    cy.get('#open-text-area').type(
      'Digno és, Senhor, de receber glória, e honra, e poder; porque tu criaste todas as coisas...',
      { delay: 0 }
    )
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')

    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
  })

  it('CT003 - Deve preencher campos utilizando o método contains', () => {
    cy.clock()
    cy.contains('label', 'Nome').type('Walmyr')
    cy.contains('label', 'Sobrenome').type('Lima e Silva Filho')
    cy.contains('label', 'E-mail').type('walmyr@talkingabouttesting.com')
    cy.contains('label', 'Algum elogio ou feedback para nós?').type('Feedback importante.', { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')

    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
  })

  it('CT004 - Deve exibir erro quando telefone for obrigatório e não for preenchido', () => {
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Lima e Silva Filho')
    cy.get('#email').type('walmyr@talkingabouttesting.com')
    cy.get('#phone-checkbox').check()
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('CT005 - Deve exibir erro ao tentar enviar formulário vazio', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('CT006 - Deve manter o campo telefone vazio ao inserir letras', () => {
    cy.get('#phone').type('abc').should('have.value', '')
  })

  it('CT007 - Deve permitir limpar e preencher novamente os campos', () => {
    cy.get('#firstName').type('WA').clear().type('Walmyr').should('have.value', 'Walmyr')
    cy.get('#lastName').type('lima').clear().type('Lima e Silva Filho').should('have.value', 'Lima e Silva Filho')
    cy.get('#email').type('EMAIL').clear().type('email@valido.com').should('have.value', 'email@valido.com')
    cy.get('#phone').type('123').clear().type('456789').should('have.value', '456789')
  })

  Cypress._.times(2, () => {
    it('CT008 - Deve preencher o formulário utilizando comando customizado', () => {
      cy.clock()
      cy.fillInAllFieldsAndSendTheForm()
      cy.tick(3000)
      cy.get('.success').should('not.be.visible')
    })
  })
  it('CT009 - Deve selecionar produto "YouTube" pelo texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  it('CT010 - Deve selecionar produto "Mentoria" pelo valor', () => {
    cy.get('#product').select('Mentoria').should('have.value', 'mentoria')
  })

  it('CT011 - Deve selecionar produto "Blog" pelo índice', () => {
    cy.get('#product').select(1).should('have.value', 'blog')
  })

  it('CT012 - Deve marcar o tipo de atendimento "Ajuda"', () => {
    cy.get('[value="feedback"]').check().should('be.checked')
  })

  it('CT013 - Deve marcar todos os tipos de atendimento um por um', () => {
    cy.get('input[type="radio"]').each(radio => {
      cy.wrap(radio).check().should('be.checked')
    })
  })

  it('CT014 - Deve marcar os dois checkboxes e desmarcar o último', () => {
    cy.get('[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')
  })

  it('CT015 - Versão alternativa de validação do telefone obrigatório com .check()', () => {
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('walmyr@talking.com')
    cy.get('#phone-checkbox').check()
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('CT016 - Deve realizar upload de arquivo com selectFile()', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('CT017 - Deve realizar upload via drag and drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('CT018 - Deve fazer upload de arquivo utilizando alias de fixture', () => {
    cy.fixture('example.json').as('FileTest')
    cy.get('#file-upload')
      .selectFile('@FileTest')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('CT019 - Deve validar se link de política de privacidade tem target="_blank"', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('CT020 - Deve acessar página de política de privacidade removendo o target', () => {
    cy.contains('a', 'Política de Privacidade').invoke('removeAttr', 'target').click()
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })
  it('CT021 - Deve exibir e ocultar as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('CT022 - Deve preenche o campo da área de texto usando o comando invoke.', () => {
    cy.get('#open-text-area')
      .invoke('val', 'um texto qualquer')
      .should('have.value', 'um texto qualquer')
  })

  it('CT024 - Faz uma requisição HTTP.', () => {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest')
      .its('status')
      .should('be.equal', 200)
    cy.get('@getRequest')
      .its('statusText')
      .should('be.equal', 'OK')
    cy.get('@getRequest')
      .its('body')
      .should('include', 'CAC TAT')
  })
})
/* ===================================
   COMENTÁRIOS ADICIONAIS E EXPLICATIVOS
====================================== */
// Usando o comando select() para selecionar elementos suspensos em CT009-CT011

// A aplicação de comandos customizados no Cypress é semelhante ao padrão PageObject.
// A principal diferença é que não há necessidade de importar manualmente as classes com os métodos
// específicos de cada página em todos os arquivos de teste.
// Ao criar um comando customizado, ele é automaticamente incluído no objeto `cy`.
// Basta referenciar o arquivo que contém os comandos dentro do `e2e.js` no momento da criação.
// A ideia e o princípio são os mesmos do PageObject, porém com a vantagem de deixar o código mais limpo.

/*
Sugestão de reestruturação para o CT007:
Separar as ações por campo melhora a clareza do teste. Também é possível criar uma função
reutilizável que recebe o seletor e dois valores (para preencher, apagar e preencher de novo).

Exemplo de função:
export function preencherApagarPreencher(selector, valor1, valor2) {
  cy.get(selector)
    .type(valor1)
    .should('have.value', valor1)
    .clear()
    .should('have.value', '')
    .type(valor2)
    .should('have.value', valor2)
}

// .each() e cy.wrap() - CT013
// O método .each(typeOfService => {}) percorre os elementos 
// encontrados e, com a ajuda do cy.wrap(typeOfService), 
// executa as ações necessárias em cada um deles, um por vez.
*/