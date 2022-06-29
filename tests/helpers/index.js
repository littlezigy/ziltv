import { faker } from '../dependencies/faker.js';
import { signup, login } from '../../src/api/user.js';

export function loginHelper() {
    const userData = {
        username: 'first_user_on_ziltv',
        password: 'password123'
    }
    return login(userData)
}
export function fakeZilAddress() {
    return 'zil' + faker.random.alphaNumeric(30);
}

export function randomNumberArray() {
    return Array.from({length: Math.ceil(Math.random() * 10)})
        .fill(0).map(() => faker.datatype.number())
}
