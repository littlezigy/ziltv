import filterBadges from "./filterBadges.js"
import fetchUserNFTsBalance from './api/fetchUserNFTBalance.js';
import connectWallet from './connectWallet.js';

export default function(badgeConfig) {
    let config;
    return connectWallet()
        .then(wallet => {
            if(wallet && wallet.address) {
                return fetchUserNFTsBalance(config.map(c => c.nftAddress), wallet.address.bech32)
                    .then(userNFTs => filterBadges(badgeConfig, userNFTs))
                    .then(badges => {
                        return badges
                    });
            } else return Promise.resolve([]);
        });
}
