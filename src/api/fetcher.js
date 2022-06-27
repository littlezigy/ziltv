export default function(uri, body, method='POST') {
    const headers = {
         'Content-Type': 'application/json'
    }
    return (() => {
        if(body) {
            body = JSON.stringify(body);
            return fetch(uri, {method, body, headers})
        }
        else
            return fetch(uri)
    })()
        .then(res => res.json())
        .then(res => {
            console.log('JSON RES:', res);
            return res;
        });
}
