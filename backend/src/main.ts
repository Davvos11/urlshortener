import app, {sessionChecker} from "./express.js"

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})