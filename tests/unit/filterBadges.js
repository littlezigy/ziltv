import nftBadges from '../../src/filterBadges.js';
import { faker } from '../dependencies/faker.js';

const randomNumberArray = () => Array.from({length: Math.ceil(Math.random() * 10)}).fill(0).map(() => faker.datatype.number())

describe('Filter badges', function() {
    it('If user has none of the NFTs');
    it('Return badge if creator specifies only NFT contract', function() {
        const config = [{
            nftAddress: 'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh',
            specifyTokens: false,
            badgeImg: 'assets/sample-badge1.jpg'
        }]

        const userNFTs = {
            [faker.finance.ethereumAddress()]: { tokenIDs: [44] },
            'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh': {
                tokenIDs: randomNumberArray()
            },
        };

        return nftBadges(config, userNFTs)
            .then(res => {
                expect(res).to.have.deep.members([
                    { imgUri: 'assets/sample-badge1.jpg' }
                ]);

            });
    });

    it('Creator specifies oneOf token_ids as well, but user doesn\'t have that token', function() {
        const config = [{
            nftAddress: 'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh',
            specifyTokens: "oneOf",
            tokenIDs: [3, 14, 12],
            badgeImg: 'assets/sample-badge1.jpg'
        }]

        const userNFTs = {
            [faker.finance.ethereumAddress()]: { tokenIDs: [44] },
            'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh': {
                tokenIDs: [ 44 ]
            },
        };

        return nftBadges(config, userNFTs)
            .then(res => {
                expect(res).to.be.empty;

            });
    });

    it('Creator specifies oneOf token_ids, and user has that token', function() {
        const config = [{
            nftAddress: 'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh',
            specifyTokens: "oneOf",
            tokenIDs: [3, 14, 12],
            badgeImg: 'assets/sample-badge1.jpg'
        }]

        const userNFTs = {
            [faker.finance.ethereumAddress()]: { tokenIDs: [44] },
            'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh': {
                tokenIDs: [ 14 ]
            },
        };

        return nftBadges(config, userNFTs)
            .then(res => {
                expect(res).to.have.deep.members([
                    { imgUri: 'assets/sample-badge1.jpg' }
                ]);

            });
    });

    it('Creator specifies allOf token_ids, and user only has one of token', function() {
        const config = [{
            nftAddress: 'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh',
            specifyTokens: "allOf",
            tokenIDs: [3, 14, 12],
            badgeImg: 'assets/sample-badge1.jpg'
        }]

        const userNFTs = {
            [faker.finance.ethereumAddress()]: { tokenIDs: [44] },
            'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh': {
                tokenIDs: [ 14, 3 ]
            },
        };

        return nftBadges(config, userNFTs)
            .then(res => {
                expect(res).to.be.empty;
            });
    });

    it('Creator specifies allOf token_ids, and user has all tokens', function() {
        const config = [{
            nftAddress: 'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh',
            specifyTokens: "allOf",
            tokenIDs: [3, 14, 12],
            badgeImg: 'assets/sample-badge1.jpg'
        }]

        const userNFTs = {
            [faker.finance.ethereumAddress()]: { tokenIDs: [44] },
            'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh': {
                tokenIDs: [3, 14, 12],
            },
        };

        return nftBadges(config, userNFTs)
            .then(res => {
                expect(res).to.have.deep.members([
                    { imgUri: 'assets/sample-badge1.jpg' }
                ]);

            });
    });
});
