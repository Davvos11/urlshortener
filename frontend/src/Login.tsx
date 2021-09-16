import React, {SyntheticEvent, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {login} from "./api";

type props = {
    onLogin: () => void
}

export const Login = (props: props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const submitLogin = async (event: SyntheticEvent) => {
        event.preventDefault()

        try {
            await login(username, password)
            setError("")
            props.onLogin()
        } catch (e) {
            setError(String(e))
        }
    }

    return (<Form onSubmit={submitLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="d-none">Email address</Form.Label>
            <Form.Control type="text" placeholder="Username"
                          onChange={event => setUsername(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="d-none">Password</Form.Label>
            <Form.Control type="password" placeholder="Password"
                          onChange={event => setPassword(event.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="submit">
            Login
        </Button>
        <span>{error}</span>
    </Form>)
}
