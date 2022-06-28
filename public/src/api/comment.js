import server from './server.js';

export function postComment(videoID, text, userID) {
    return server('comment', {videoID, text, userID })
}
