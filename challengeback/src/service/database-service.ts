import { sqlite3 } from "sqlite3";


export async function createTable() {
    

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db');

const createTableQuery = `
  CREATE TABLE comments_new (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    post_id INTEGER NOT NULL,
    user TEXT NOT NULL,
    comment TEXT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts (id)
  )
`;

db.run(createTableQuery, (error: any) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Tabela "users" criada com sucesso!');
  }

  db.close();
});

}

export async function TransferDATA() {
    const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db');

const transferDataQuery = `
  INSERT INTO comments_new (id,post_id, user, comment)
  SELECT id, post_id, user, comment
  FROM comments
`;

db.run(transferDataQuery, function(error:any) {
  if (error) {
    console.error(error);
  } else {
    console.log('Dados transferidos com sucesso da tabela');
  }

  db.close();
});
}

export async function alterTable() {
    const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db');

const renameTableQuery = `
  ALTER TABLE comments_new
  RENAME TO comments
`;

db.run(renameTableQuery, (error:any) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Tabela renomeada com sucesso!');
  }

  db.close();
});

}