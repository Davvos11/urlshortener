import express from "express";
import {UserModel} from "./database/user.js";
import mongo from "mongodb";
import {URLModel} from "./database/url.js";

export async function add(req: express.Request, res: express.Response) {
    // Get the user from the session
    const username = req.session.username
    const [user] = await UserModel.findByName(username)

    // Get the inputs and verify them
    const path = req.body.path.replace(/^\/|\/$/g, "")
    const value = req.body.value
    if (!path || !value) {
        return res.status(400).send("Please provide a path and value")
    }

    try {
        // Create a new redirect
        await URLModel.add(path, value, user)
        return res.status(204).send()
    } catch (e) {
        // Error 11000 means a duplicate key, i.e. path already taken
        if (e instanceof mongo.MongoError && e.code === 11000) {
            return res.status(400).send(`Path /${path} already exists`)
        } else {
            console.error(e)
            return res.status(500).send()
        }
    }
}

export async function redirect(req: express.Request, res: express.Response) {
    // Get the path
    const path = req.path.replace(/^\/|\/$/g, "")
    try {
        // Get the redirect
        const [item] = await URLModel.get(path)
        if (!item) {
            return res.status(400).send(`/${path} does not exist`)
        }
        // Redirect
        return res.redirect(item.value)
    } catch (e) {
        console.error(e)
        return res.status(500).send()
    }
}
