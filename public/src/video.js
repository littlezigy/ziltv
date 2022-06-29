import getBadges from "./getBadges.js"
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
            newComment: null,
            canComment: false,
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
                if(res._links && res._links.post_comment)
                    this.canComment = true;
                this.video = res;
                return getVideoComments(this.videoID)
            })
            .then(res => {
                const comments = res;
                this.comments = comments;
                return getBadges(this.videoID)
            })
            .then(badges => {
                this.badges = badges;
            });
    }
});

app.mount('#videoApp');
