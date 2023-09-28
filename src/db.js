const { Pool } = require('pg')
const pool = new Pool({
    host: 'db',
    port: 5432,
    user:'user123',
    password: '1234',
    database: 'projeto-hoteis'
})

module.exports = pool