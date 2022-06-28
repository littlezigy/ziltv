// import zilliqa from '../../dependencies/zilliqa.min.js';
import '../../dependencies/zilliqa.min.js';

export function toBytes20(address) {
    const uri = 'https://dev-api.zilliqa.com/';

    return Zilliqa.fromBech32Address(address);
}
