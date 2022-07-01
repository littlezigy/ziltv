const app = Vue.createApp({
    props: {
        _init_username: String,
        _init_email: String
    },
    data() {
        return {
            username: null,
            email: null,
        }
    },
    mounted() {
        this.username = this._init_username;
        this.password = this._init_password;
    }
});

app.mount("#edit-profile");
