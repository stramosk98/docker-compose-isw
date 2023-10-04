const { Pool } = require('pg');

const pool = new Pool({
    host: 'db',
    port: 5432,
    user: 'user123',
    password: '1234',
    database: 'projeto-hoteis'
});

async function createTable() {
    try {
        const client = await pool.connect();
        await client.query(`
            CREATE TABLE IF NOT EXISTS hotel_room (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                address VARCHAR(100),
                room INTEGER,
                available BOOLEAN
            )
        `);
        client.release();
        console.log('Success create.');
    } catch (error) {
        console.error('Error create:', error);
    } finally {
        pool.end();
    }
}

createTable();