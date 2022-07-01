import fetcher from './fetcher.js';
import '/dependencies/zilliqa.min.js';
import utils from '../utils/index.js';
import { ZILLIQA_URL } from '/config.local.js';

export function getNFTMetadata(nftAddress) {
    if(Array.isArray(nftAddress))
        nftAddress = nftAddress[0];

    const uri = ZILLIQA_URL;
    const z = new Zilliqa.Zilliqa(uri);

    let ans = {};

    nftAddress = utils.address.toBytes20(nftAddress);
    let contract = z.contracts.at(nftAddress);

    return contract.getSubState('name')
        .then(res => {
            console.log("nft metadata:", res);
        })
}
