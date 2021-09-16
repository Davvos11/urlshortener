import React, {SyntheticEvent, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {add} from "./api";

type props = {
}

export const AddUrl = () => {
    const [path, setPath] = useState("")
    const [value, setValue] = useState("")
    const [status, setStatus] = useState("")

    const submitURL = async (event: SyntheticEvent) => {
        event.preventDefault()

        try {
            setStatus("Loading...")
            const res = await add(path, value)
            setStatus(await res.text())
        } catch (e) {
            setStatus("Error: " + String(e))
        }
    }

    return (<Form onSubmit={submitURL}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="d-none">Destination URL</Form.Label>
            <Form.Control type="text" placeholder="Destination URL"
                          onChange={event => setValue(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="d-none">Path</Form.Label>
            <Form.Control type="text" placeholder="Path"
                          onChange={event => setPath(event.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="submit">
            Create
        </Button>
        <span>{status}</span>
    </Form>)
}
