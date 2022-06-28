import { signup, login } from '../../src/api/auth.js';
import { faker } from '../dependencies/faker.js';

describe('Authentication api', function() {
    it('Auth', function() {
        const  data = {
            username: faker.internet.userName(),
            password: faker.internet.password()
        }

        return signup(data)
        .then(res => {
            expect(res).to.have.property('id').that.is.a('number');

            return login(data)
        })
        .then(res => {
            expect(res).to.have.property('id').that.is.a('number');
        });
    });
});

