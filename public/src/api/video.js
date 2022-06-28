import server from '/src/api/server.js';

export function fetch(id) {
    return server('video/'+id);
}

export function fetchAll() {
    return server('videos')
}
