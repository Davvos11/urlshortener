import app, {sessionChecker} from "./express.js"
import * as db from "./database/database.js"
import {login, signup} from "./authentication.js";
import {add, redirect} from "./url.js";

const PORT = 8000

// Connect to database
await db.connect()

// Add endpoints
app.post('/login', login)
app.post('/signup', signup)
app.post('/add', sessionChecker, add)
app.all('*', redirect)

// Start Express server
try {
    app.listen(PORT, () => {
        console.log(`Listening at http://localhost:${PORT}`)
    })
} catch (e) {
    await db.disconnect()
}
