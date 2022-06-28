import { fetchProfile, editProfile } from '../../src/api/user.js';
import { faker } from '../dependencies/faker.js';

describe('User api: Profile', function() {
    it('View another user\'s profile', function() {
        return fetchProfile(1)
        .then(res => {
            expect(res).to.contain({
                name: "First user",
                username: "first_user_on_ziltv"
            });
        });
    });

    it('Fetch and edit profile', function() {
        const newProfile = {
            name: faker.name.findName(),
            username: faker.internet.userName(),
            email: faker.internet.email()
        }

        return editProfile(newProfile)
        .then(res => {
            expect(res).to.have.property('id').that.is.a('number');
        });
    });
});

