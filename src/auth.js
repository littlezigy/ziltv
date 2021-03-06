import {fetchProfile, signup, login} from './api/user.js';

const app = Vue.createApp({
    data() {
        return {
            username: null,
            password: null,
            toSignup: true,
            error: null,
        }
    },
    methods: {
        clearErrors() {
            this.error = null;
        },
        checkIfLoggedin() {
            return fetchProfile()
            .then(() => window.location.replace('/'));
        },
        signup() {
            this.clearErrors();

            const data = {
                username: this.username,
                password: this.password
            }
            return signup(data)
                .then(res => console.log(res))
                .then(() => window.location.reload())
                .catch(e => {
                    this.error = e;
                });
        },
        login() {
            this.clearErrors();

            const data = {
                username: this.username,
                password: this.password
            }
            return login(data)
                .then(() => window.location.reload())
                .catch(e => {
                    this.error = e;
                });
        },
    },
    mounted() {
        return this.checkIfLoggedin();
    }
});

app.mount('#app');
