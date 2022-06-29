import fetchUserBalance from '../../src/api/fetchUserNFTBalance.js';

describe('Fetch user NFT balance', function() {
    this.timeout(10000);
    it('Return empty array if nftAddresses array is empty');
    it('Count how many tokens of NFT user has: base16 version');

    it('fetchUserBalance() return empty object if method not found', function() {
        const address = 'zil15q2gxq7tze6k025apsa3c362chz6k76zrmnzkk';
        const nftAddress = 'zil1zjsl04m6jmr295lhz3e2hq8ahzrm2u4g5yumqr';

        return fetchUserBalance([nftAddress], address)
            .then(res => {
                expect(res).to.eql({ });
            });
    });
    it('fetchUserBalance() for single address', function() {
        const address = 'zil15q2gxq7tze6k025apsa3c362chz6k76zrmnzkk';
        const nftAddress = 'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh';

        return fetchUserBalance([nftAddress], address)
            .then(res => {
                expect(res).to.deep.equal({
                    [address]: {
                        balance: 3,
                        tokenIDs: ['1', '2', '3']
                    }
                });
            });
    });
    it('fetchUserBalance() for array of addresses', function() {
        const address = [ 'zil15q2gxq7tze6k025apsa3c362chz6k76zrmnzkk',
            'zil1h2s5e3t07cc4dhff54yagedzw4944g0q7el7e4',
            'zil1p8e6veje2vpgtu8k8xjrty55x47fc48ccxf70c',
            'zil19razqvf2ktpfjq9350s0lcuzmg4gh3f2sp9ey4'];
        const nftAddress = 'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh';

        return fetchUserBalance([nftAddress], address)
            .then(res => {
                expect(res).to.deep.equal({
                    [address[0]]: {
                        balance: 3,
                        tokenIDs: ['1', '2', '3']
                    },
                    [address[1]]: {
                        balance: 1,
                        tokenIDs: ['4']
                    },
                    [address[2]]: {
                        balance: 2,
                        tokenIDs: ['5', '6']
                    },
                });
            });
    });
});
