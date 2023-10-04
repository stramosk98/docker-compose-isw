const pool = require('./db')

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