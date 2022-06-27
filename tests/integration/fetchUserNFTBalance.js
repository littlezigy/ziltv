import fetchUserBalance from '../../src/api/fetchUserNFTBalance.js';

describe('Fetch user NFT balance', function() {
    it('Return empty array if nftAddresses array is empty');
    it('Count how many tokens of NFT user has: base16 version');
    it('Count how many tokens of NFT user has: bech32 version', function() {
        const address = 'zil15q2gxq7tze6k025apsa3c362chz6k76zrmnzkk';
        const nftAddress = 'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh';

        return fetchUserBalance([nftAddress], address)
        .then(res => {
            expect(res).to.deep.equal({
                [nftAddress]: {
                    balance: 3,
                    tokenIDs: ['1', '2', '3']
                }
            });
        });
    });
});
