import fetcher from './fetcher.js';
import connectWallet from "../connectWallet.js"

export default function(nftAddress, address) {
    // const uri = "https://api.zilliqa.com/";
    const uri = 'https://dev-api.zilliqa.com/';

    const queryForNFT = JSON.stringify([
        {
            "id": "1",
                "jsonrpc": "2.0",
                "method": "GetSmartContractSubState",
                "params": [address, "balances", ["0x043a99eaa5493ccc3cf17296d46415e7948dab67"]]
        },
        {
            "id": "2",
            "jsonrpc": "2.0",
            "method": "GetSmartContractSubState",
            "params": ["a845C1034CD077bD8D32be0447239c7E4be6cb21", "balances", ["0x00204a8125fa7941cc5c6f63ef8dd5d26492c9ae"]]
        }
    ])

    return fetcher(uri, queryForNFT)
}
