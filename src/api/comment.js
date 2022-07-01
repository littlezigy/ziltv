import server from './server.js';

export function getVideoComments(videoID) {
    return server('video/'+videoID+'/comments');
}

export function postComment(videoID, text, userID) {
    return server('comment', {videoID, text, userID })
}
