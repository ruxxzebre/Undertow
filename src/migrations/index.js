import knex from "knex";
import { v4 as uuid } from "uuid";

console.log("MIGRATING...");

const db = knex({
  client: "sqlite3",
  connection: {
    filename: "./data.db",
  },
});

async function init() {
  await db.schema.createTable("notes", (table) => {
    table.increments("id").primary();
    table.string("name").defaultTo("Note");
    table.string("text").defaultTo("");
    table.string("type").defaultTo("Document");
    table.string("uuid").defaultTo(() => uuid());
		table.string("miscJSON").defaultTo(JSON.stringify({}));
  });
}

init();
