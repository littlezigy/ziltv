import connectWallet from "../connectWallet.js"
import {fetchProfile} from '/src/api/user.js';

const app = Vue.createApp({
    template: `
        <div>
            <h1><a href='/'>ZilTv</a></h1>
            <div>
                <button class='connect-wallet' @click='connectWallet'>Connect Wallet</button>
                <a id='login-button' v-if='!isLoggedIn' href='/login'>Login</a>
                <a v-if='isLoggedIn' href='/upload'>Upload</a>
                <a v-if='isLoggedIn' href='/dashboard'>My Dashboard</a>
            </div>
        </div>
    `,

    data() {
        return {
            isLoggedIn: false
        }
    },
    methods: {
        connectWallet
    },
    mounted() {
        return fetchProfile()
        .then(res => {
            if(res.error)
                this.isLoggedIn = false;
            else if(res.id)
                this.isLoggedIn = true;
        });
    }
});

app.mount('#menu');
