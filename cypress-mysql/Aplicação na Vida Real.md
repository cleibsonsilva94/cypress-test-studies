# Testando Banco de Dados com Cypress (Exemplo PostgreSQL)

## 📌 Cenário Real

Imagine um sistema de **RH** que armazena informações dos funcionários em um banco de dados PostgreSQL.  
Neste exemplo, o funcionário principal cadastrado no sistema é **Michael Jackson**.  

Queremos garantir que as operações de banco de dados, como **inserir, atualizar, consultar e remover registros**, funcionem corretamente.  
Para isso, usamos o **Cypress** com queries SQL automatizadas. 🎯  

---

## 🛠 Exemplo de Testes Automatizados

O código abaixo mostra como validar dados no banco de dados `employee_data`, simulando a gestão de Michael Jackson e seus filhos.

```javascript
describe('PostgreSQL', () => {
  beforeEach(() => {
    // DELETE — Remove registros antes de cada teste para manter o banco limpo.
    cy.runSQL("DELETE FROM employee_data WHERE name IN ('Michael Jackson', 'Prince Jackson', 'Paris Jackson', 'Blanket Jackson');")
      .then(() => {
        cy.log('Registros de teste removidos')
      })

    // SELECT — Confirma que os registros foram realmente removidos.
    cy.runSQL("SELECT * FROM employee_data WHERE name IN ('Michael Jackson', 'Prince Jackson', 'Paris Jackson', 'Blanket Jackson');")
      .then(queryResponse => {
        expect(queryResponse.length).to.equal(0)
      })
  })

  // Verifica o funcionário base do sistema.
  it('Verifica funcionário existente', () => {
    cy.runSQL("INSERT INTO employee_data(name, age, designation, salary) VALUES ('Michael Jackson', 50, 'Singer', 1000000);")

    cy.runSQL("SELECT * FROM employee_data WHERE name='Michael Jackson';")
      .then(queryResponse => {
        expect(queryResponse.length).to.equal(1)

        const { name, age, designation, salary } = queryResponse[0]

        expect(name).to.equal('Michael Jackson')
        expect(age).to.equal(50)
        expect(designation).to.equal('Singer')
        expect(salary).to.equal(1000000)
      })
  })

  // Testa inserção e atualização de filhos de Michael Jackson.
  it('Cria e atualiza filhos de Michael Jackson', () => {
    // INSERT — Insere os filhos.
    cy.runSQL("INSERT INTO employee_data(name, age, designation, salary) VALUES ('Prince Jackson', 26, 'Producer', 20000);")
    cy.runSQL("INSERT INTO employee_data(name, age, designation, salary) VALUES ('Paris Jackson', 25, 'Model', 15000);")
    cy.runSQL("INSERT INTO employee_data(name, age, designation, salary) VALUES ('Blanket Jackson', 21, 'Student', 0);")

    // SELECT — Verifica se os filhos foram inseridos.
    cy.runSQL("SELECT * FROM employee_data WHERE name IN ('Prince Jackson', 'Paris Jackson', 'Blanket Jackson');")
      .then(queryResponse => {
        expect(queryResponse.length).to.equal(3)
      })

    // UPDATE — Atualiza o cargo do Prince.
    cy.runSQL("UPDATE employee_data SET designation = 'Music Producer' WHERE name='Prince Jackson';")

    // SELECT — Confirma atualização.
    cy.runSQL("SELECT * FROM employee_data WHERE name='Prince Jackson';")
      .then(queryResponse => {
        const { designation } = queryResponse[0]
        expect(designation).to.equal('Music Producer')
      })
  })
})

```
# O que está sendo testado?

- **Limpeza do ambiente:** antes de cada teste, os registros de Michael e seus filhos são removidos.  
- **Validação de funcionário base:** Michael Jackson é inserido e seus dados são confirmados.  
- **Inserção múltipla:** os filhos (Prince, Paris e Blanket) são adicionados ao banco.  
- **Atualização de registros:** o cargo do Prince é atualizado de *Producer* para *Music Producer*.  

## ✅ Benefícios

- Garante que o sistema de RH não tenha erros em operações críticas.  
- Simula casos reais de inserção, atualização e consulta no banco.  
- Mantém a confiabilidade dos dados antes de ir para produção.  

## 🚀 Aplicações Reais

Esse modelo de testes pode ser aplicado em diversos sistemas que utilizam banco de dados, por exemplo:  

- **Sistemas de RH:** cadastro de funcionários, cargos e salários.  
- **E-commerce:** gerenciamento de produtos, estoques e pedidos.  
- **CRMs:** gestão de contatos, leads e oportunidades de vendas.  
- **Sistemas financeiros:** controle de contas, transações e extratos bancários.  

### Exemplo de aplicação em sistemas financeiros

Testes automatizados podem validar que transações bancárias foram registradas corretamente, que saldos são atualizados após depósitos ou transferências e que relatórios de extrato exibem os dados corretos.  

### Exemplo de aplicação em e-commerce

Os testes podem garantir que novos produtos são inseridos corretamente no catálogo, que os preços e estoques estão atualizados e que pedidos realizados pelos clientes são armazenados de forma confiável no banco de dados.
