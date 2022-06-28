import getBadges from "./getBadges.js"
import {postComment} from '/src/api/comment.js';
import * as videoAPI from '/src/api/video.js';

const app = Vue.createApp({
    data() {
        return {
            video: {},
            videoID: null,
            badges: [],
            username: null,
            newComment: null,
        }
    },

    methods: {
        postComment() {
            const videoID = this.videoID;
            const text = this.newComment;

            return postComment(videoID, text);
        }
    },
    mounted() {
        const videoIDMatch = window.location.pathname.match(/(?<=videos\/)\d+$/)
        if(videoIDMatch)
            this.videoID = videoIDMatch[0];

        return videoAPI.fetch(this.videoID)
            .then(res => {
                this.video = res;
                return getBadges(this.videoID)
            })
            .then(badges => {
                this.badges = badges;
            });
    }
});

app.mount('#app');
