const express = require('express')
const pool = require('./db')
const port = 3000

const app = express()
app.use(express.json())

app.get('/', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM hotel_room')
        res.status(200).send(data.rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

app.post('/', async (req, res) => {
    const { name, address, room, free } = req.body
    try {
        await pool.query(`INSERT INTO hotel_room (name, address, room, available) 
                          VALUES ($1, $2, $3, $4)`, [name, address, room, free])
        res.status(200).send({ message: "Success insert" })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

app.get('/setup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE hotel_room (id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100), room INTEGER, available BOOLEAN)')
        res.status(200).send({ message: "Success create" })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

app.post('/setup/', async (req, res) => {
    const { address, free } = req.body
    try {
        const data = await pool.query('SELECT * FROM hotel_room WHERE address = ($1) and available = ($2)', [address, free])
        res.status(200).send(data.rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

app.listen(port, () => console.log(`Server has started on port: ${port}`))