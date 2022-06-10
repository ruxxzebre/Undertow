import { join } from "path";
import { app } from "electron";
import knex from "knex";
import { API } from "./preload";

export class IPC {
  constructor() {
    this.db = null;
  }

  handler(...args) {
    console.log(args);
    console.log(__dirname);
  }

  init_db() {
    if (this.db) return this.db;
    const pt = join(app.getPath("userData"), "main.db");
    this.db = knex({
      client: "sqlite3",
      connection: {
        filename: pt,
      },
    });
  }

  get_db() {
    if (!this.db) return this.init_db();
    return this.db;
  }

  get_table(table) {
    return this.get_db().table(table);
  }

  get_create_table() {
    return this.get_db().schema.createTable;
  }

  create_notes_table() {
    this.get_create_table()("notes", (table) => {
      table.increments("id").primary();
      table.string("title");
      table.string("content");
      table.string("created_at");
      table.string("updated_at");
    });
  }

  create_tags_table() {
    this.get_create_table()("tags", (table) => {
      table.increments("id").primary();
      table.string("name");
      table.string("created_at");
      table.string("updated_at");
    });
  }

  create_notes_to_tags_table() {
    this.get_create_table()("notes_to_tags", (table) => {
      table.increments("id").primary();
      table.integer("note_id");
      table.integer("tag_id");
      table.string("created_at");
      table.string("updated_at");
    });
  }

	init_tables() {
		this.create_notes_table();
		this.create_tags_table();
		this.create_notes_to_tags_table();
	}
}

export const connector = new IPC();
