import server from '/src/api/server.js';

export function fetch(id) {
    return server('video/'+id);
}

export function upload(data) {
    return server('video', data);
}

export function fetchMyVideos() {
    return server('my-videos')
}

export function fetchAll() {
    return server('videos')
}
