import {fetchAll} from './api/video.js';

const app = Vue.createApp({
    data() {
        return {
            videos: []
        }
    },
    mounted() {
        return fetchAll()
        .then(res => {
            this.videos = res
        });
    }
});

app.mount('#app');
