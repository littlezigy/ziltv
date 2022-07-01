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
            res.forEach(v => {
                console.log("v:", v);
                this.$refs['videoRef' + v.id].src = v.url;
            });
        });
    }
});

app.mount('#app');
