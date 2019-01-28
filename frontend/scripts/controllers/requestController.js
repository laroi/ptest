define([], () => {
    let get,
        post;
    get = (url) => {
        return fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((response)=> {
            return response
        })
    };
    post = (url, data) => {
        return fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
    }
    return {
        get: get,
        post: post
    }
})
