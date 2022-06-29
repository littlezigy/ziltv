import nftBadges from '../../src/filterBadges.js';
import { faker } from '../dependencies/faker.js';
import {fakeZilAddress, randomNumberArray} from '/tests/helpers/index.js';

describe('Filter badges', function() {
    it('If user has none of the NFTs');
    it('Return badge if creator specifies only NFT contract', function() {
        const user1 = fakeZilAddress(), user2 = fakeZilAddress();
        const config = [{
            nftAddress: 'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh',
            specifyTokens: false,
            badgeImg: 'assets/sample-badge1.jpg'
        }]

        // obj of {user: {nft data}}
        const nftHolders = {
            'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh': {
                [user1]: { tokenIDs: [44] }
            }
        };

        const res = nftBadges(config, nftHolders)

        expect(res).to.deep.eql({
            [user1]: [
                { imgUri: 'assets/sample-badge1.jpg' }
            ]
        });
    });

    it('Creator specifies oneOf token_ids as well, but users don\'t have that token', function() {
        const config = [{
            nftAddress: 'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh',
            specifyTokens: "oneOf",
            tokenIDs: [1, 14, 12],
            badgeImg: 'assets/sample-badge1.jpg'
        }, {
            nftAddress: 'zil1zjsl04m6jmr295lhz3e2hq8ahzrm2u4g5yumqr',
            specifyTokens: "oneOf",
            tokenIDs: [2, 14, 12],
            badgeImg: 'assets/sample-badge1.jpg'
        }]

        const user1 = fakeZilAddress(), user2 = fakeZilAddress();

        const nftHolders = {
            'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh': {
                [user1]: { tokenIDs: [44] },
                [user2]: { tokenIDs: [3] },
            },
        };

        const badges = nftBadges(config, nftHolders)
        expect(badges).to.deep.eql({
            [user1]: [ ],
            [user2]: [ ]
        });
    });

    it('Creator specifies oneOf token_ids, and user has that token', function() {
        const config = [{
            nftAddress: 'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh',
            specifyTokens: "oneOf",
            tokenIDs: [3, 14, 12],
            badgeImg: 'assets/sample-badge1.jpg'
        }]

        const user = fakeZilAddress();

        const nftHolderObj = {
            'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh': {
                [user]: { tokenIDs: [44] },
            },
        };

        const res = nftBadges(config, nftHolderObj)
        expect(res).to.deep.eql({
            [user]: { imgUri: 'assets/sample-badge1.jpg' }
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
            [fakeZilAddress()]: { tokenIDs: [44] },
            'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh': {
                tokenIDs: [ 14, 3 ]
            },
        };

        const res = nftBadges(config, userNFTs)
        expect(res).to.be.empty;
    });

    it('Creator specifies allOf token_ids, and user has all tokens', function() {
        const config = [{
            nftAddress: 'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh',
            specifyTokens: "allOf",
            tokenIDs: [3, 14, 12],
            badgeImg: 'assets/sample-badge1.jpg'
        }]

        const userNFTs = {
            [fakeZilAddress()]: { tokenIDs: [44] },
            'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh': {
                tokenIDs: [3, 14, 12],
            },
        };

        const res = nftBadges(config, userNFTs)
        expect(res).to.have.deep.members([
            { imgUri: 'assets/sample-badge1.jpg' }
        ]);
    });

    it('Multiple configs', function() {
        const config = [{
            nftAddress: 'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh',
            specifyTokens: "oneOf",
            tokenIDs: [1, 2, 3],
            badgeImg: 'assets/sample-badge1.jpg'
        }, {
            nftAddress: 'zil1zjsl04m6jmr295lhz3e2hq8ahzrm2u4g5yumqr',
            specifyTokens: "allOf",
            tokenIDs: [2, 4, 6],
            badgeImg: 'assets/sample-badge2.jpg'
        }, {
            nftAddress: 'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh',
            specifyTokens: "false",
            badgeImg: 'assets/sample-badge3.jpg'
        }]

        const user1 = fakeZilAddress(), user2 = fakeZilAddress(), user3=fakeZilAddress(), user4=fakeZilAddress();

        const nftHolders = {
            'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh': {
                [user1]: { tokenIDs: [3] },
                [user2]: { tokenIDs: [19] },
                [user3]: { tokenIDs: [17] },
            },
            'zil1zjsl04m6jmr295lhz3e2hq8ahzrm2u4g5yumqr': {
                [user1]: { tokenIDs: [3] },
                [user2]: { tokenIDs: [19] },
                [user3]: { tokenIDs: [2,4,6, 70] },
                [user4]: { tokenIDs: [17] },
            },
        };

        const badges = nftBadges(config, nftHolders)

        expect(badges).to.deep.eql({
            [user1]: [
                {badgeUri: 'assets/sample-badge1.jpg'},
                {badgeUri: 'assets/sample-badge3.jpg'}
            ],
            [user2]: [
                {badgeUri: 'assets/sample-badge3.jpg'},
            ],
            [user3]: [
                {badgeUri: 'assets/sample-badge2.jpg'},
                {badgeUri: 'assets/sample-badge3.jpg'}
            ],
            [user4]: [
            ]
        });
    });

    it.only('Another multiple config', function() {
        const badgeConfigs = [{
            "badgeImg": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/850.jpg",
            "nftAddress": "zil10p7ak8ujnj24ava0r7ckunpvmddwuye4xa48r8",
            "tokenIDs": [
                "8",
                "4",
                "2",
                "0"
            ],
            "specifyTokens": "false"
        },
            {
                "badgeImg": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/382.jpg",
                "nftAddress": "zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh",
                "tokenIDs": [
                    "5",
                    "1",
                    "6",
                    "7"
                ],
                "specifyTokens": "false"
            },
            {
                "badgeImg": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1042.jpg",
                "nftAddress": "zil1zjsl04m6jmr295lhz3e2hq8ahzrm2u4g5yumqr",
                "tokenIDs": [
                    "2",
                    "7",
                    "9"
                ],
                "specifyTokens": "oneOf"
            },
            {
                "badgeImg": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/964.jpg",
                "nftAddress": "0x6bbff9089a2d0760ff064c0c4fe9db8ff2c271cc",
                "tokenIDs": [
                    "4",
                    "3",
                    "6",
                    "0"
                ],
                "specifyTokens": "oneOf"
            },
            {
                "badgeImg": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/749.jpg",
                "nftAddress": "0x3f22e6fcf4a9b094b08ea8c732cac6eda8f9eb7e",
                "tokenIDs": [
                    "4",
                    "5",
                    "3",
                    "8",
                    "0"
                ],
                "specifyTokens": "oneOf"
            }]

        const addresses = [
            "zil1zkrlarygylrmld7jm3g42r222mlt5y4h8uvuvt",
            "zil1zkrlarygylrmld7jm3g42r222mlt5y4h8uvuvt",
            "zil1zkrlarygylrmld7jm3g42r222mlt5y4h8uvuvt",
            "zil1zkrlarygylrmld7jm3g42r222mlt5y4h8uvuvt",
            "zil1c5dj84pt7rcx5jpnevsjm90ct4mmfjjwghsyyv",
            "zil1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq9yf6pz"
        ]

        const badges = nftBadges(badgeConfigs, nftHolders)
        expect(badges).to.deep.eql({
        });
    });
});
