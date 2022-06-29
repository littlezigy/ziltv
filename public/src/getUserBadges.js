import filterBadges from "./filterBadges.js"
import fetchUserNFTsBalance from './api/fetchUserNFTBalance.js';

export default function(addresses, config) {
    // const badges = {};
    if(!Array.isArray(addresses))
        addresses = [addresses];

    const nftAddresses = config.map(c => c.nftAddress);
    let promiseChain = Promise.resolve();

    const nftHolderObj = {};
    nftAddresses.forEach(nftAddress => {
        promiseChain = promiseChain.then(() => fetchUserNFTsBalance(nftAddress, addresses))
            .then(nftHolders => {
                const badges = {}
                nftHolderObj[nftAddress] = nftHolders;
            });
    });

    return promiseChain
        .then(() => {
            const badges = filterBadges(config, nftHolderObj)

            return badges
        });
}
