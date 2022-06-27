import fetcher from './fetcher.js';

export default function(path, body, method='POST') {
    const uri = 'http://localhost:3095/' + path;
    return fetcher(uri, body)
        .then(res => {
            return res;
        });
}
