export default function(creatorID) {
    return Promise.resolve([
        {
            nftAddress: 'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh',
            specifyTokens: false,
            badgeImg: 'assets/sample-badge1.jpg'
        }, {
            nftAddress: 'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh',
            specifyTokens: "oneOf",
            tokenIDs: [1, 2],
            badgeImg: 'assets/sample-badge2.jpg'
        }, {
            nftAddress: 'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh',
            specifyTokens: "oneOf",
            tokenIDs: [3, 7, 8],
            badgeImg: 'assets/sample-badge3.jpg'
        }, {
            nftAddress: 'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh',
            specifyTokens: "allOf",
            tokenIDs: [2,3,4],
            badgeImg: 'assets/sample-badge4.jpg'
        }, {
            nftAddress: 'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh',
            specifyTokens: "allOf",
            tokenIDs: [50,23,14],
            badgeImg: 'assets/sample-badge4.jpg'
        }
    ]);
}
