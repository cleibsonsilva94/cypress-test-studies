describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('CT001 - Preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('input[name="firstName"]')
      .as('firstNameField')
      .should('be.visible')
      .type('Cleibson')
    cy.get('@firstNameField').should('have.value', 'Cleibson')

    cy.get('input[name="lastName"]')
      .as('lastNameField')
      .should('be.visible')
      .type('Lima')
    cy.get('@lastNameField').should('have.value', 'Lima')

    cy.get('input[id="email"]')
      .as('emailField')
      .should('be.visible')
      .type('cleibson@gmail.com')
    cy.get('@emailField').should('have.value', 'cleibson@gmail.com')

    cy.get('input[id="phone"]')
      .as('phoneField')
      .should('be.visible')
      .type('93187771')
    cy.get('@phoneField').should('have.value', '93187771')

    cy.get('input[value="elogio"]').click()

    cy.get('textarea[id="open-text-area"]')
      .as('feedbackField')
      .should('be.visible')
      .type('Obrigado')
    cy.get('@feedbackField').should('have.value', 'Obrigado')

    cy.get('.button').click()
    cy.get('.success')
  })

  // CT002 - TESTE COM MENSAGEM LONGA E USO DO DELAY
  it('CT002 - Escreve uma mensagem de feedback com muitos caracteres para testar o delay', () => {
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Lima e Silva Filho')
    cy.get('#email').type('walmyr@talkingabouttesting.com')
    cy.get('#open-text-area').type(
      'Digno és, Senhor, de receber glória, e honra, e poder; porque tu criaste todas as coisas, e por tua vontade são e foram criadas',
      { delay: 0 }
    )
    cy.get('button[type="submit"]').click()
    cy.get('.success')
  })

  // CT003 - USO DO CONTAINS PARA PREENCHER CAMPOS
  it('CT003 - Usa o contains para preencher campos do formulário', () => {
    cy.contains('label', 'Nome').type('Walmyr')
    cy.contains('label', 'Sobrenome ').type('Lima e Silva Filho')
    cy.contains('label', 'E-mail').type('walmyr@talkingabouttesting.com')
    cy.contains('label', 'Algum elogio ou feedback para nós?').type(
      'Digno és, Senhor, de receber glória, e honra, e poder; porque tu criaste todas as coisas, e por tua vontade são e foram criadas',
      { delay: 0 }
    )
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

  it('CT004 - Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', () => {
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Lima e Silva Filho')
    cy.get('#email').type('walmyr@talkingabouttesting.com')
    cy.get('#phone-checkbox').click()
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('CT005 - Verifica a impossibilidade de enviar o formulário sem preencher nada', () => {
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('CT006 - Validação do campo telefone: inserção de letras', () => {
    cy.get('#phone').type('abc')

    cy.get('input').should('not.have.value', 'abc')
  })

  // CT007 - USO DO MÉTODO .clear() PARA APAGAR CAMPOS
  it('CT007 - Verifica se os campos do formulário são apagados corretamente', () => {
    cy.get('#firstName')
      .type('WA')
      .should('have.value', 'WA')
      .clear()
      .should('not.have.value', 'WA')
      .type('Walmyr')
      .should('have.value', 'Walmyr')

    cy.get('#lastName')
      .type('lima e silva filho')
      .should('have.value', 'lima e silva filho')
      .clear()
      .should('not.have.value', 'lima e silva filho')
      .type('Lima e Silva Filho')
      .should('have.value', 'Lima e Silva Filho')

    cy.get('#email')
      .type('WALMYE@talkingabouttesting.com')
      .should('have.value', 'WALMYE@talkingabouttesting.com')
      .clear()
      .should('not.have.value', 'WALMYE@talkingabouttesting.com')
      .type('walmye@talkingabouttesting.com')
      .should('have.value', 'walmye@talkingabouttesting.com')

    cy.get('#phone')
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('not.have.value', '123456789')
      .type('897654321')
      .should('have.value', '897654321')
  })

  // CT008 - USO DE COMANDO CUSTOMIZADO
  it('CT008 - Preenche o formulário com comando customizado', () => {
    cy.fillInAllFieldsAndSendTheForm()
  })

  // CT009 - SELEÇÃO DE PRODUTO PELO TEXTO
  it('CT009 - Seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  // CT010 - SELEÇÃO DE PRODUTO PELO VALUE
  it('CT010 - Seleciona um produto (Mentoria) por seu valor', () => {
    cy.get('#product')
      .select('Mentoria')
      .should('have.value', 'mentoria')
  })

  // CT011 - SELEÇÃO DE PRODUTO PELO ÍNDICE
  it('CT011 - Seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  // CT012 - MARCA UM TIPO DE ATENDIMENTO (RÁDIO)
  it('CT012 - Marca o tipo de atendimento "Ajuda"', () => {
    cy.get('[value="feedback"]')
      .check()
      .should('be.checked')
  })

  // CT013 - MARCA TODOS OS TIPOS DE ATENDIMENTO
  it('CT013 - Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })

  // CT014 - MARCA E DESMARCA CHECKBOXES
  it('CT014 - Marca ambos os checkboxes e desmarca o último', () => {
    cy.get('[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  // CT015 - NOVA VERSÃO DO CT004 USANDO .check()
  it('CT015 - Versão alternativa do CT004 com uso do .check()', () => {
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Lima e Silva Filho')
    cy.get('#email').type('walmyr@talkingabouttesting.com')
    cy.get('#phone-checkbox').check()
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  // CT016 - UPLOAD DE ARQUIVO VIA SELECTFILE()
  it('CT016 - Envia um arquivo', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  // CT017 - UPLOAD VIA DRAG AND DROP
  it('CT017 - Envia um arquivo via drag and drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  // CT018 - UPLOAD DE ARQUIVO COM USO DE FIXTURE COM ALIAS
  it.only('CT018 - Seleciona um arquivo utilizando uma fixture com alias', () => {
    cy.fixture('example.json').as('FileTest')
    cy.get('#file-upload')
      .selectFile('@FileTest')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  // LIDANDO COM OUTRA ABA NO NAVEGADOR
  it('CT019 - Verifica se as tags "target" estão presentes e definidas como "_blank"', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('CT019 - Acessa a página de política de privacidade removendo o target e clicando', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
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