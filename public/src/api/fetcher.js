export default function(uri, body, method='POST') {
    console.log("METHOD:", method, arguments);
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
            return res;
        });
}
