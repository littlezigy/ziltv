import ipfsUpload from '/src/api/ipfsUpload.js';
import { IPFS_API, IPFS_GATEWAY } from '/config.local.js';

import {addBadgeConfig, getBadgeConfig} from './api/badges.js';
import {getNFTMetadata} from './api/nft.js';

const app = Vue.createApp({
    data() {
        return {
            badgeConfigs: [],
            badgeName: null,
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
        updatePreview: function() {
            const file = this.$refs.fileUpload.files[0];
            const self = this;

            if(file) {
                const fileReader = new window.FileReader();
                fileReader.readAsDataURL(file);
                fileReader.addEventListener('load', function() {
                    self.preview = this.result;
                    self.fileData = { file, buffer: this.result };
                    self.file = file;
                });
            }
        },
        postBadgeConfig() {
            const file = this.file;

            if(file) {
                const name = this.badgeName || 'badge' + (Math.random() * 1000);

                return ipfsUpload(file, name)
                .then(res => {
                    return addBadgeConfig({
                        badgeImg: res.url,
                        specifyTokens: this.specifyToken,
                        nftAddress: this.nftAddress,
                        tokenIDs: this.tokenIDs,
                    });
                }).then(res => {
                    window.location.reload();
                });
            }
        }
    },
    mounted() {
        const self = this;
        this.$refs.fileUpload.addEventListener('change', function() {
            return self.updatePreview()
        });

        return getBadgeConfig()
            .then(res => {
                this.badgeConfigs = res.map(b => {
                    const nft = { address: b.nftAddress };
                    nft.url = 'https://viewblock.io/zilliqa/address/' + nft.address;

                    return {
                        ...b,
                        nft
                    }
                });

                const nftAddresses = [ ...new Set(res.map(i => i.nftAddress)) ];

                return getNFTMetadata(nftAddresses)
            }).then(metadata => {
                this.badgeConfigs = this.badgeConfigs.map(b => {
                    const nft = b.nft;
                    if(metadata[b.nftAddress])
                        nft.name = metadata[b.nftAddress].name;

                    return {
                        ...b,
                        nft
                    }
                });
            });
    }
});

app.mount('#app');
