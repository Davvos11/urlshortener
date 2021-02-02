import Mongoose from "mongoose";
import * as util from "util";
import * as fs from "fs";
import path from "path";

const readFile = util.promisify(fs.readFile);

const CREDENTIALS_FILE = path.join(path.dirname('..'), 'database.txt');

let database: Mongoose.Connection

export async function connect() {
    // If already connected, return the database
    if (database) {
        return database
    }

    // Read the database URI
    const dbUri = (await readFile(CREDENTIALS_FILE, 'utf-8')).trim()

    // Connect to the database
    await Mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        dbName: "urlshortnener"
    })

    // Save and return the connection
    database = Mongoose.connection
    return database
}

export async function disconnect() {
    // If the database is undefined, we wont have to disconnect
    if (!database) {
        return
    }

    // Disconnect
    return Mongoose.disconnect()
}

