import * as videoAPI from '/src/api/video.js';

const app = Vue.createApp({
    data() {
        return {
            videos: null
        }
    },
    
    mounted() {
        return videoAPI.fetchMyVideos()
            .then(res => {
                if(res)
                    this.videos = res;
            });
    },
});

app.mount('#my-videos');
