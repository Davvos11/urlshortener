import app, {sessionChecker} from "./express.js"
import * as db from "./database/database.js"
import {login, signup} from "./authentication.js";
import express from "express";

const PORT = 8000

// Connect to database
await db.connect()

// Add endpoints
app.post('/login', login)
app.post('/signup', signup)
app.get('/test', sessionChecker, (req: express.Request, res: express.Response) => {
    return res.status(200).send("nice")
})

// Start Express server
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})