import {signup, login} from './api/auth.js';

const app = Vue.createApp({
    data() {
        return {
            username: null,
            password: null
        }
    },
    methods: {
        signup() {
            const data = {
                username: this.username,
                password: this.password
            }
            return signup(data)
        },
        login() {
            const data = {
                username: this.username,
                password: this.password
            }
            return login(data)
        }
    }
});

app.mount('#app');
