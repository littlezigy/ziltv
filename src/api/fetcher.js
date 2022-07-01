export default function(uri, body, method='POST') {
    const otherConfig = {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    }

    return (() => {
        if(body) {
            body = JSON.stringify(body);
            return fetch(uri, {method, body, ...otherConfig})

        }
        else
            return fetch(uri, otherConfig)
    })()
        .then(res => res.json())
        .then(res => {
            return res;
        });
}
