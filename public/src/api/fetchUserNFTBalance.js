import fetcher from './fetcher.js';
import '/dependencies/zilliqa.min.js';
import utils from '../utils/index.js';
import { ZILLIQA_URL } from '/config.local.js';

export default function(nftAddress, addresses) {
    if(!Array.isArray(addresses))
        addresses = [addresses];
    if(Array.isArray(nftAddress))
        nftAddress = nftAddress[0];

    const base16Address = {}
    addresses.forEach(address => base16Address[address] = utils.address.toBytes20(address).toLowerCase());

    const uri = ZILLIQA_URL;
    const z = new Zilliqa.Zilliqa(uri);

    let ans = {};

    nftAddress = utils.address.toBytes20(nftAddress);
    let contract = z.contracts.at(nftAddress);

    return contract.getSubState('balances')
        .then(res => {
            let promiseChain = Promise.resolve();

            addresses.forEach(address => {
                if(res && res.balances) {
                    let balance = res.balances[
                        utils.address.toBytes20(address).toLowerCase()
                    ];

                    if(balance) {
                        if(typeof balance =='string')
                            balance = parseInt(balance);

                        ans[address] = {balance} 

                        promiseChain = promiseChain
                            .then(() => contract.getSubState('token_owners'))
                            .then(res => {
                                if(res) {
                                    const tokenOwners = res.token_owners;
                                    addresses.forEach(address => {
                                        const tokenIDs = []
                                        for(let token in tokenOwners) {
                                            if(tokenOwners[token] == base16Address[address])
                                                tokenIDs.push(token);
                                        }
                                        if(tokenIDs.length > 0)
                                            ans[address].tokenIDs = tokenIDs;
                                    });
                                }
                            });
                    } else return ans
                }  else return ans;
            });

            return promiseChain
            .then(() => ans);
        })
}
