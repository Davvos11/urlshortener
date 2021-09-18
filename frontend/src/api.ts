const LOGIN_URL = '/login'
const LOGIN_CHECK_URL = '/login-check'
const ADD_URL = '/add'

export async function loginCheck() {
    const url = getUrl(LOGIN_CHECK_URL)

    const res = await (await fetch(url.toString())).json()

    return Boolean(res)
}

export async function login(username: string, password: string) {
    const url = getUrl(LOGIN_URL)
    const body = {username, password}

    return fetch(url.toString(), {
        method: "POST",
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    })
}

export async function add(path: string, value: string) {
    const url = getUrl(ADD_URL)
    const body = {path, value}

    return fetch(url.toString(), {
        method: "POST",
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    })
}

function getUrl(path: string) {
    return new URL(path, new URL(window.location.href).origin)
}
