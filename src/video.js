import {postComment, getVideoComments} from '/src/api/comment.js';
import * as videoAPI from '/src/api/video.js';

const app = Vue.createApp({
    data() {
        return {
            video: {},
            videoID: null,
            badges: [],
            comments: [],
            username: null,
            badgeConfig: [],
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
                this.badgeConfig = res.badgeConfig;
                if(res._links && res._links.post_comment)
                    this.canComment = true;
                this.video = res;
            });
    }
});

app.mount('#videoApp');
