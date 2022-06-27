import getBadges from '../../src/getBadges.js';

describe('Return user badges', function() {
    it('Return user badges', function() {
        return getBadges()
            .then(res => {
                expect(res).to.have.deep.members([
                    { imgUri: 'assets/sample-badge1.jpg' },
                    { imgUri: 'assets/sample-badge2.jpg' },
                    { imgUri: 'assets/sample-badge3.jpg' },
                ])
            });
    });
});
