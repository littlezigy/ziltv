import {addBadgeConfig} from './api/badges.js';

const app = Vue.createApp({
    data() {
        return {
            badgeImg: null,
            nftAddress: null,
            specifyToken: 'oneOf',
            tokenOptions: ['false', 'oneOf', 'allOf'],
            tokenIDs: [1, 2, 3, 4,5]
        }
    },
    methods: {
        postBadgeConfig() {
            console.log("Posting");
            return addBadgeConfig({
                badgeImg: this.badgeImg,
                specifyTokens: this.specifyToken,
                nftAddress: this.nftAddress,
                tokenIDs: this.tokenIDs,
            }).then(res => {
                console.log("done:", done);
            });
        }
    },
    mounted() {
    }
});

app.mount('#app');
