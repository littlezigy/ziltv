import fetcher from './fetcher.js';
import '../../dependencies/zilliqa.min.js';
import utils from '../utils/index.js';

export default function(nftAddresses, address) {
    // const uri = "https://api.zilliqa.com/";
    nftAddresses = nftAddresses.map(nftAddress => utils.address.toBytes20(nftAddress));
    const checksumAddress = utils.address.toBytes20(address);
    address = checksumAddress.toLowerCase();

    const uri = 'https://dev-api.zilliqa.com/';
    const z = new Zilliqa.Zilliqa(uri);

    return Promise.all(nftAddresses.map(nftAddress => {
        let contract = z.contracts.at(nftAddress);

        return contract.getSubState('token_owners', [address.toLowerCase()])
            .then(res => {
                // let balance = res.balances[address.toLowerCase()];
                console.log("tokenIds:", res);

                // const token_ids = res.token_owners.map(
                /*
                if(balance && typeof balance =='string')
                    balance = parseInt(balance);

                return { balance }
                */
            });
    }));
}
