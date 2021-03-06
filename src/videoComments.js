import getUserBadges from "./getUserBadges.js"
import {postComment, getVideoComments} from '/src/api/comment.js';
import * as videoAPI from '/src/api/video.js';

const app = Vue.createApp({
    data() {
        return {
            badgeConfig: [],
            comments: [],
            username: null,
            noConnectWallet: true
        }
    },

    methods: {
    },
    mounted() {
        let badgeConfig;
        const videoIDMatch = window.location.pathname.match(/(?<=videos\/)\d+$/)
        if(videoIDMatch)
            this.videoID = videoIDMatch[0];

        return videoAPI.fetch(this.videoID)
            .then(res => {
                document.title = res.name + ' | ZilTv';
                badgeConfig = res.badgeConfig;
                this.badgeConfig = res.badgeConfig;
                return getVideoComments(this.videoID)
            })
            .then(res => {
                let promiseChain = Promise.resolve();
                let comments = res;
                this.comments = comments;

                return getUserBadges(
                    comments.map(c => c.poster.bech32),
                    badgeConfig
                )
                    .then(badges => {
                        comments = comments.map(c => {
                            return {...c,
                                poster: {...c.poster,
                                    badges: badges[c.poster.bech32] || []
                                }
                            }
                        });

                        this.comments = comments;
                    })
            })
        /*
            .then(badges => {
                this.badges = badges;
            });
        */
    }
});

app.mount('#comments');

