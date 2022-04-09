'use strict';

const pool = require('../db.js');

class Interface {
  static sendMessage = async (data) => {
    let sql = `INSERT INTO messages (email,content,level) VALUES ($1,$2,$3) RETURNING *;`;
    let values = [data.email, data.content, data.level];
    let newMessage = await pool.query(sql, values);

    return newMessage.rows[0];
  };

  static returnMessages = async () => {
    let sql = `SELECT * FROM messages;`;
  
    let allMessages = await pool.query(sql);

    return allMessages.rows;
  };
}

module.exports = Interface;
