export default {
    badgeConfig:  [
        {
            nftAddress: 'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh',
            specifyTokens: false,
            badgeImg: '/assets/sample-badge1.jpg'
        }, {
            nftAddress: 'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh',
            specifyTokens: "oneOf",
            tokenIDs: [1, 2],
            badgeImg: '/assets/sample-badge2.jpg'
        }, {
            nftAddress: 'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh',
            specifyTokens: "oneOf",
            tokenIDs: [3, 7, 8],
            badgeImg: '/assets/sample-badge3.jpg'
        }, {
            nftAddress: 'zil1pzasmwxgg70cwal6l5qy0xfez3r40reazzxyjh',
            specifyTokens: "allOf",
            tokenIDs: [2,3,4],
            badgeImg: '/assets/sample-badge4.jpg'
        }, {
            nftAddress: 'zil1zjsl04m6jmr295lhz3e2hq8ahzrm2u4g5yumqr',
            specifyTokens: "allOf",
            tokenIDs: [10,11,12],
            badgeImg: '/assets/sample-badge5.jpg'
        }, {
            nftAddress: 'zil1zjsl04m6jmr295lhz3e2hq8ahzrm2u4g5yumqr',
            specifyTokens: "oneOf",
            tokenIDs: [1,13,3],
            badgeImg: '/assets/sample-badge6.jpg'
        }
    ]

}
