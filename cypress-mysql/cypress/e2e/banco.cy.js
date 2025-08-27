describe("Testando conexão com o BancoCypress", () => {
    it("Deve buscar usuários no banco", () => {
      cy.task("queryDb", "SELECT * FROM usuarios").then((result) => {
        cy.log("Resultado:", JSON.stringify(result));
        expect(result.length).to.be.greaterThan(0);
      });
    });
  });  