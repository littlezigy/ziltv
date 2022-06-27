import connectWallet from "./connectWallet.js"

export default function(config) {
    console.log("config", config);

    return connectWallet()
    .then(wallet => {
        console.log("wallet:", wallet);
    });
}
