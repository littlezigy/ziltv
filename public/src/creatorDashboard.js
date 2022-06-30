import {addBadgeConfig} from './api/badges.js';

const app = Vue.createApp({
    data() {
        return {
            badgeImg: null,
            nftAddress: null,
            specifyToken: 'false',
            tokenOptions: [
                {value: 'false', title:'Holders of any token in this contract', },
                {value: 'oneOf', title: 'Holders of any of the token ids listed' },
                {value: 'allOf', title: 'Holder with all of the token ids lsted'}
            ],
            tokenIDs: ['']
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
