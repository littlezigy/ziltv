import connectWallet from "../connectWallet.js"

const app = Vue.createApp({
    template: `
        <div>
            <h1><a href='/'>ZilTv</a></h1>
            <div>
                <button class='connect-wallet' @click='connectWallet'>Connect Wallet</button>
                <a id='login-button' href='/login'>Login</a>
            </div>
        </div>
    `,
    methods: {
        connectWallet
    }
});

app.mount('#menu');

