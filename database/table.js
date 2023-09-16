const { pool } = require("./connection");

const Event = `CREATE TABLE IF NOT EXISTS Event (
                    Id INT AUTO_INCREMENT PRIMARY KEY,
                    EventImage TEXT,
                    Schedule VARCHAR(255),
                    Title VARCHAR(255),
                    Descript VARCHAR(255) 
                );`;

const User = `CREATE TABLE IF NOT EXISTS User (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255),
    Password VARCHAR(255),
    Phonenumber BIGINT,
    event VARCHAR(255),
    role VARCHAR(255) default 'user'
);`;

async function create_tables() {
    await pool.query(Event);
    await pool.query(User);
}

module.exports = { create_tables };