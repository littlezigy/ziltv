import { addBadgeConfig, getBadgeConfig } from '../../src/api/badges.js';

describe('Badge api', function() {
    it('Fetch badge config');

    it('Create badge config', function() {
        const data = {
            nftAddress: 'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh',
            specifyTokens: false,
            badgeImg: 'assets/sample-badge1.jpg',
            creatorID: 4
        }

        return addBadgeConfig(data)
        .then(res => {
            expect(res).to.have.property('id').that.is.a('number');
        });
    });
});
