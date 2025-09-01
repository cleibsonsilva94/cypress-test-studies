describe('PostgreSQL', () => {
  beforeEach(() => {
    // DELETE — Remove o registro antes de cada teste para manter o banco de dados limpo.
    cy.runSQL("DELETE FROM employee_data WHERE name='mary';")
      .then(() => {
        cy.log('Table row deleted')
      })

    // SELECT — Garante que o dado utilizado pelo teste foi realmente removido.
    cy.runSQL("SELECT * FROM employee_data WHERE name='mary';")
      .then(queryResponse => {
        expect(queryResponse.length).to.equal(0)
      })
  })

  // Verifica o dado que já existe no banco.
  it('queries on the `employee_data` table', () => {
    cy.runSQL('SELECT * FROM employee_data;')
      .then(queryResponse => {
        expect(queryResponse.length).to.equal(1)

        const { name, age, designation, salary } = queryResponse[0]

        expect(name).to.equal('john')
        expect(age).to.equal(27)
        expect(designation).to.equal('engineer')
        expect(salary).to.equal(9000)
      })
  })

  // Teste que realiza operações básicas no banco de dados existente na nuvem.
  it('INSERT, SELECT, and UPDATE into/from the `employee_data` table', () => {
    // INSERT — Insere um novo registro.
    cy.runSQL("INSERT INTO employee_data(name, age, designation, salary) VALUES ('mary', 30, 'ceo', 50000);")

    // SELECT — Verifica se o novo registro foi inserido.
    cy.runSQL('SELECT * FROM employee_data;')
      .then(queryResponse => {
        expect(queryResponse.length).to.equal(2) // Agora deve haver dois registros.
      })

    // SELECT — Busca o registro específico de "mary" e valida seus dados.
    cy.runSQL("SELECT * FROM employee_data WHERE name='mary';")
      .then(queryResponse => {
        expect(queryResponse.length).to.equal(1)

        const { name, age, designation, salary } = queryResponse[0]

        expect(name).to.equal('mary')
        expect(age).to.equal(30)
        expect(designation).to.equal('ceo')
        expect(salary).to.equal(50000)
      })

    // UPDATE — Atualiza o valor da coluna `designation` do registro de "mary".
    cy.runSQL("UPDATE employee_data SET designation = 'CEO' WHERE name='mary';")

    // SELECT — Confirma que a atualização foi aplicada corretamente.
    cy.runSQL("SELECT * FROM employee_data WHERE name='mary';")
      .then(queryResponse => {
        expect(queryResponse.length).to.equal(1)

        const { designation } = queryResponse[0]

        expect(designation).to.equal('CEO')
      })
  })
})

/*
   Explicações relacionadas ao banco de dados:

  - cy.runSQL(query):
    Função customizada do Cypress para executar comandos SQL diretamente no banco PostgreSQL.
    Permite interagir com tabelas, inserindo, consultando, atualizando ou removendo dados.
    Retorna o resultado da consulta, que pode ser validado nos testes.

  - DELETE FROM employee_data:
    Remove registros da tabela 'employee_data'.
    Usado aqui para garantir que o ambiente de teste comece limpo.

  - SELECT * FROM employee_data:
    Consulta todos os registros da tabela.
    Utilizado tanto para verificar o estado inicial quanto para validar inserções/atualizações.

  - INSERT INTO employee_data(...):
    Insere um novo registro na tabela com os valores fornecidos.
    No teste, insere o registro da "mary".

  - UPDATE employee_data SET ... WHERE ...:
    Atualiza campos de registros já existentes na tabela.
    No teste, altera a função de "mary" de 'ceo' para 'CEO'.

  - queryResponse:
    Objeto retornado pela execução do SQL. Representa o resultado da consulta.
    Exemplo: no SELECT, retorna um array com os registros encontrados.
*/