import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// you would have to import / invoke this in another file

//
export async function openDbLocal () {
  return open({
    filename: './database.db',
    driver: sqlite3.Database
  })
}