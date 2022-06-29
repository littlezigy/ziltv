import {fetchProfile, editProfile} from './api/user.js';

const app = Vue.createApp({
    data() {
        return {
            profile: {},
            canEdit: false,
            username: null,
            password: null,
            name: null,
            email: null,
            profileID: null
        }
    },
    methods: {
        editProfile() {
            const data = {
                username: this.username,
                password: this.password
            }
            return editProfile(data)
        }
    },
    mounted() {
        let profileID;
        const profileIDMatch = window.location.pathname.match(/(?<=profile\/)\d+$/)
        if(profileIDMatch)
            profileID = profileIDMatch[0];

        return fetchProfile(profileID)
        .then(res => {
            this.profile = res;
        });
    }
});

app.mount('#app');
