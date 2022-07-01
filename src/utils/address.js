// import zilliqa from '/dependencies/zilliqa.min.js';
import '/dependencies/zilliqa.min.js';

export function toBytes20(address) {
    try{
        return Zilliqa.fromBech32Address(address);
    }catch(e) {
        if(e.message == 'Invalid bech32 address') {
            try {
                Zilliqa.toBech32Address(address)
                return address
            } catch {
                throw 'Not a base 16';
            }
        }
    }
}

// import zilliqa from '/dependencies/zilliqa.min.js';
import '/dependencies/zilliqa.min.js';

export function toBech32(address) {
    try{
        return Zilliqa.toBech32Address(address);
    }catch(e) {
        console.log("E:", e);
        if(e.message == 'Invalid bech32 address')
            return address
    }
}
