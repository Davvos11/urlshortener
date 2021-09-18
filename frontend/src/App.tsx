import React, {useState} from 'react';
import './App.css';
import {Login} from "./Login";
import {AddUrl} from "./AddURL";
import {Spinner} from "react-bootstrap";
import {loginCheck} from "./api";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true)

    loginCheck().then(res => {
        setLoggedIn(res)
        setLoading(false)
    })

    let body: JSX.Element

    if (loading) {
        body = (<Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>)
    } else if (!loggedIn) {
        body = <Login onLogin={() => setLoggedIn(true)}/>
    } else {
        body = <AddUrl />
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>URL shortener</h1>
                {body}
            </header>
        </div>
    );
}

export default App;
