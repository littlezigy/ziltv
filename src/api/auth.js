import server from './server.js';

export function signup(data) {
    return server('signup', data)
}

export function login(data) {
    return server('login', data)
}
