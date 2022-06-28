import fetcher from './fetcher.js';
import connectWallet from "../connectWallet.js"
import '../../dependencies/zilliqa.min.js';
import utils from '../utils/index.js';

export default function(nftAddresses, address) {
    // const uri = "https://api.zilliqa.com/";
    const checksumAddress = utils.address.toBytes20(address);
    address = checksumAddress.toLowerCase();

    const uri = 'https://dev-api.zilliqa.com/';
    const z = new Zilliqa.Zilliqa(uri);

    return Promise.all(nftAddresses.map(nftAddress => {
        let ans = {nftAddress};

        nftAddress = utils.address.toBytes20(nftAddress);
        let contract = z.contracts.at(nftAddress);

        return contract.getSubState('balances', [address.toLowerCase()])
            .then(res => {
                let balance = res.balances[address.toLowerCase()];

                if(balance && typeof balance =='string')
                    balance = parseInt(balance);

                ans =  {...ans, balance} 
            })
            .then(res => contract.getSubState('token_owners'))
            .then(res => {
                ans.tokenIDs = Object.keys(res.token_owners);
                return ans;
            });
    })).then(res => {
        const ans = {};

        res.forEach(({balance, nftAddress, tokenIDs}) => {
            ans[nftAddress] = {balance, tokenIDs}
        });

        return ans
    });
}
