const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    host: "localhost",
    database:"products",
    password:"123",
    port:5432,
    charset: 'utf8',
});

module.exports = pool;
