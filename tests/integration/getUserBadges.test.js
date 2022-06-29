import getUserBadges from '/src/getUserBadges.js';
import testData from '/tests/testData/index.js';

describe.only('Get user badges', function() {
    this.timeout(30000);
    it('Return empty array if nftAddresses array is empty');

    it('getUserBadges() for single address', function() {
        const address = 'zil15q2gxq7tze6k025apsa3c362chz6k76zrmnzkk';

        return getUserBadges(address, testData.badgeConfig)
            .then(res => {
                expect(res).to.deep.equal({
                    [address]: [
                        { imgUri: '/assets/sample-badge1.jpg', },
                    ]
                });
            });
    });
    it('getUserBadges() for array of addresses', function() {
        const address = [ 'zil15q2gxq7tze6k025apsa3c362chz6k76zrmnzkk',
            'zil1h2s5e3t07cc4dhff54yagedzw4944g0q7el7e4',
            'zil1p8e6veje2vpgtu8k8xjrty55x47fc48ccxf70c',
            'zil19razqvf2ktpfjq9350s0lcuzmg4gh3f2sp9ey4',
            'zil1nugh54k8ms8h0wr4le86xh472al69rslhcnqdw'
        ];

        return getUserBadges(address, testData.badgeConfig)
            .then(res => {
                console.log("res:", res);
                expect(res).to.deep.eql({
                    [address[0]]: [
                        { imgUri: '/assets/sample-badge1.jpg', },
                        { imgUri: '/assets/sample-badge2.jpg' }
                    ],
                    [address[1]]: [
                    ],
                    [address[2]]: [
                    ],
                    [address[3]]: [
                    ],
                    [address[4]]: [
                        { imgUri: '/assets/sample-badge5.jpg', },
                        { imgUri: '/assets/sample-badge6.jpg' }
                    ]
                });
            });
    });
});
