const fs = require('fs');
const crypto = require('crypto');
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

/**
 * It can write/read/update/delete notes from file with provided filename.
 */
class DB {
  static initDb = async (dbPath) => {
    if(!DB.dbConnection && dbPath) {
      try {
        DB.dbConnection = await sqlite.open({
          filename: dbPath,
          driver: sqlite3.Database,
        })

       await DB.dbConnection.exec('CREATE TABLE IF NOT EXISTS todo (title TEXT UNIQUE, content TEXT, id INTEGER NOT NULL PRIMARY KEY)')

        return DB.dbConnection
      } catch (e) {
        console.error(e.message)
      }
      
    }
  }
  
}

module.exports = DB;
