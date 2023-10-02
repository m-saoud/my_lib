const Pool = require('pg').Pool
const pool = new Pool({
    user:'postgres',
    port: 5433,
    dbname: 'my_lib',
    password: '1391',
})

module.exports = pool;