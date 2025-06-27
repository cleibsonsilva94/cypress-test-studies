# Cypress Test Studies - Testes Automatizados  

Este repositório contém estudos e práticas com testes automatizados utilizando **Cypress**, uma das ferramentas mais populares entre profissionais de QA para testes end-to-end em aplicações web.  

## 📌 Requisitos  

Antes de rodar os testes, certifique-se de que os seguintes componentes estão instalados em seu ambiente:  

- **Node.js**: Recomendado a versão 16 ou superior  
- **NPM**: Gerenciador de pacotes do Node.js  

## 🚀 Instalação do Cypress  

1. Clone este repositório:  
   ```bash
   git clone git@github.com:seu-usuario/cypress-test-studies.git
   ```

2. Acesse o diretório do projeto:  
   ```bash
   cd cypress-test-studies
   ```

3. Instale as dependências do projeto:  
   ```bash
   npm install
   ```

4. Instale o Cypress (caso não tenha sido instalado com as dependências):  
   ```bash
   npm install cypress --save-dev
   ```

## 🥾 Execução dos Testes  

Para rodar os testes, utilize os comandos abaixo:

- **Abrir o Cypress em modo interativo (desktop):**  
  ```bash
  npx cypress open
  ```

- **Abrir o Cypress em modo interativo (mobile):**  
  ```bash
  npx cypress open --config viewportWidth=410,viewportHeight=860
  ```

- **Executar os testes em modo headless (desktop):**  
  ```bash
  npx cypress run
  ```

- **Executar os testes em modo headless (mobile):**  
  ```bash
  npx cypress run --config viewportWidth=410,viewportHeight=860
  ```

## 📂 Estrutura do Projeto  

- `cypress/e2e/CAC-TAT.cy.js`  
  Testes disponibilizados pelo professor do curso.

- `cypress/e2e/CAC-TATMeusTestes.cy.js`  
  Testes desenvolvidos por mim durante o curso, com base nos desafios propostos.

- `cypress/e2e/privacyPolicy.cy.js`  
  Testes voltados à validação da página de Política de Privacidade da aplicação.

## 🧪 Aplicação Testada  

[CAC-TAT - Central de Atendimento ao Cliente TAT](https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html)

## 📚 Referência  

Este repositório é um fork de:  
🔗 [https://github.com/wlsf82/cypress-do-zero-a-nuvem](https://github.com/wlsf82/cypress-do-zero-a-nuvem)  

O curso é extremamente didático e nos incentiva a construir o conhecimento lendo a [documentação oficial do Cypress](https://docs.cypress.io) e colocando em prática as atividades propostas.

---

Sinta-se à vontade para explorar o projeto, sugerir melhorias ou compartilhar dicas! 🚀