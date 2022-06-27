import getBadges from "./getBadges.js"
import {postComment} from './api/comment.js';

const app = Vue.createApp({
    data() {
        return {
            videoID: null,
            badges: [],
            username: "Foo",
            newComment: null,
        }
    },

    methods: {
        postComment() {
            const videoID = this.videoID;
            const text = this.newComment;
            const userID: 4;

            return postComment(videoID, text, userID);
        }
    },
    mounted() {
        const videoID = window.location.hash.substring(1);
        this.videoID = videoID;

        return getBadges()
            .then(badges => {
                this.badges = badges;
            });
    }
});

app.mount('#app');
