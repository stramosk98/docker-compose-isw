const express = require('express')
const pool = require('./db')
const port = 3000

const app = express()
app.use(express.json())

app.get('/hotels', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM hotel_room')
        res.status(200).send(data.rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

app.post('/hotels/insert/', async (req, res) => {
    const { name, address, room, available } = req.body
    try {
        await pool.query(`INSERT INTO hotel_room (name, address, room, available) 
                          VALUES ($1, $2, $3, $4)`, [name, address, room, available])
        res.status(200).send({ message: "Success insert" })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

app.post('/hotels/where/', async (req, res) => {
    const { address, available } = req.body
    try {
        const data = await pool.query('SELECT * FROM hotel_room WHERE address = ($1) and available = ($2)', [address, available])
        res.status(200).send(data.rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

app.listen(port, () => console.log(`Server has started on port: ${port}`))