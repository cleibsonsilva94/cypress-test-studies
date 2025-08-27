const { defineConfig } = require("cypress");
const mysql = require("mysql2/promise");

async function queryTestDb(query) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Cleib94",
    database: "BancoCypress",
  });

  const [rows] = await connection.execute(query);
  await connection.end();
  return rows;
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        queryDb: (query) => {
          return queryTestDb(query);
        },
      });
    },
  },
});