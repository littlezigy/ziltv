import { signup, login, fetchProfile, editProfile } from '../../src/api/user.js';
import { faker } from '../dependencies/faker.js';

describe('Authentication api', function() {
    it('Auth', function() {
        const  data = {
            username: faker.internet.userName(),
            password: faker.internet.password()
        }

        const newProfile = {
            name: faker.name.findName(),
            username: faker.internet.userName(),
            email: faker.internet.email()
        }

        return signup(data)
        .then(res => {
            expect(res).to.have.property('id').that.is.a('number');

            return login(data)
        })
        .then(res => {
            expect(res).to.have.property('id').that.is.a('number');
            return fetchProfile(res.id)
        }).then(res => {
            expect(res).to.contain(data);
            expect(res).to.have.property('email').that.is.null;

            return editProfile(newProfile)
        }).then(res => {
            expect(res).to.contain(newProfile);
        });
    });
});

