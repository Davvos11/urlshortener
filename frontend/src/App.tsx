import React, {useState} from 'react';
import './App.css';
import {Login} from "./Login";
import {AddUrl} from "./AddURL";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <div className="App">
            <header className="App-header">
                <h1>URL shortener</h1>
                {loggedIn ?
                    <AddUrl /> :
                    <Login onLogin={() => setLoggedIn(true)}/>
                }
            </header>
        </div>
    );
}

export default App;
