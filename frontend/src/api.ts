const LOGIN_URL = '/login'
const ADD_URL = '/add'

export async function login(username: string, password: string) {
    const url = new URL(LOGIN_URL, new URL(window.location.href).origin)
    const body = {username, password}

    return fetch(url.toString(), {
        method: "POST",
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    })
}

export async function add(path: string, value: string) {
    const url = new URL(ADD_URL, new URL(window.location.href).origin)
    const body = {path, value}

    return fetch(url.toString(), {
        method: "POST",
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    })
}


