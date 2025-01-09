require('dotenv').config()

const PORT = process.env.PORT
const TOKEN = process.env.TOKEN
const HISTORY_SIZE = process.env.HISTORY_SIZE ?? 10
const POLL_TIMEOUT = process.env.POLL_TIMEOUT ?? 1

const express = require('express')
const app = express()

const PINGS = []

app.post('/ping', (req, res) => {
console.log({h: req.headers})
    const token = req.headers["authorization"]?.substring(7)
    if (token != TOKEN) return

    PINGS.push(new Date())
    
    if (PINGS.length > HISTORY_SIZE) 
        PINGS.splice(PINGS.length - HISTORY_SIZE)

    res.status(200).send()
})

app.get("/", (req, res) => {
    res.status(200)
    	.header("Refresh", POLL_TIMEOUT)
    	.send(PINGS.join("<br>"))
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

