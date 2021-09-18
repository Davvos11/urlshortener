import express from "express";
import Mongoose from "mongoose";
import {UserModel} from "./database/user.js";
import mongo from "mongodb"

export async function login(req: express.Request, res: express.Response) {
    const username = req.body.username
    const password = req.body.password

    // Verify input
    if (!username || !password) {
        return res.status(400).send("Please provide a username and password")
    }

    // Get user from database
    const [user] = await UserModel.findByName(username)

    // Check if the user exists
    if (!user) {
        return res.status(401).send("Invalid credentials")
    }

    // Check password
    if (user.checkPassword(password)) {
        // If password is correct, add session
        req.session.username = username
        return res.sendStatus(204)
    } else {
        return res.status(401).send("Invalid credentials")
    }
}

export async function signup(req: express.Request, res: express.Response) {
    const username = req.body.username
    const password = req.body.password

    // Verify input
    if (!username || !password) {
        return res.status(400).send("Please provide a username and password")
    }

    try {
        // Create a user
        await UserModel.createUser(username, password)
        return res.status(204).send()
    } catch (e) {
        // Error 11000 means a duplicate key, i.e. username already taken
        if (e instanceof mongo.MongoError && e.code === 11000) {
            return res.status(400).send(`Username ${username} already taken`)
        } else {
            console.error(e)
            return res.status(500).send()
        }
    }

}

export async function loginCheck(req: express.Request, res: express.Response) {
    if (req.session.username) {
        return res.send(true)
    } else {
        return res.send(false)
    }
}
