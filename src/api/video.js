import server from './server.js';

export function fetchAll() {
    return server('videos')
}
