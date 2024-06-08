const Pool = require("pg").Pool;
const db = new Pool({
    user: 'juan',
    host: 'localhost',
    database: 'catedraapi',
    password: '3110',
    port: 5432,
  });
  

module.exports = { db };

