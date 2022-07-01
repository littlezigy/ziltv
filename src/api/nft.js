import fetcher from './fetcher.js';
import '/dependencies/zilliqa.min.js';
import utils from '../utils/index.js';
import { ZILLIQA_URL } from '/config.local.js';

export function getNFTMetadata(nftAddress) {
    if(!Array.isArray(nftAddress))
        nftAddress = [nftAddress];

    const uri = ZILLIQA_URL;
    const z = new Zilliqa.Zilliqa(uri);

    let ans = {};

    const requests = nftAddress.map(i => {
        return [utils.address.toBytes20(i).substring(2), 'token_name', []]
    });
    const blockchain = z.blockchain;

    return blockchain.getSmartContractSubStateBatch(requests)
        .then(res => {
            res = res.batch_result;
            const response = {}
            nftAddress.forEach((a, index) => {
                if(res[index].result) {
                    response[a] = {
                        name: res[index].result.token_name
                    }
                }
            });
            return response;
        })
}
