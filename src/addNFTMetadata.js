import { IPFS_API, IPFS_GATEWAY } from '/config.local.js';

import {getNFTMetadata} from './api/nft.js';

export default function(badgeConfigs) {
    badgeConfigs = badgeConfigs.map(b => {
        const nft = { address: b.nftAddress };
        nft.url = 'https://viewblock.io/zilliqa/address/' + nft.address;

        return {
            ...b,
            nft
        }
    });

    const nftAddresses = [ ...new Set(badgeConfigs.map(i => i.nftAddress)) ];

    return getNFTMetadata(nftAddresses)
        .then(metadata => {
            badgeConfigs = badgeConfigs.map(b => {
                const nft = b.nft;
                if(metadata[b.nftAddress])
                    nft.name = metadata[b.nftAddress].name;

                return {
                    ...b,
                    nft
                }
            });

            return badgeConfigs
        });
}
