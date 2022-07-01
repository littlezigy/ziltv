import server from './server.js';
import { signup as signup_, login as login_ } from './auth.js';

export const signup = signup_
export const login = login_

export function fetchProfile(id) {
    if(id)
        return server('profile/' + id);
    else return server('profile');
}

export function editProfile(data) {
    return server("profile", data, "PUT")
}
