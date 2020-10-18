const get = async (url) => {
    const res = await fetch(url);
    if (res.ok) {
        const json = await res.json();
        return json;
    } else {
        console.log("error");
        const error = {
            status: res.status,
            statusText: res.statusText
        };
        error.statusText = await res.text();
        return error;
    }
};
const post = async (url, data) => {
    const dataString = JSON.stringify(data);
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"             //'Authorization': 'Bearer ' + token
        },
        body: dataString
    });
    if (res.ok) {
        const json = await res.json();
        const dataString = JSON.stringify(json, null, 4);
        this.result.value = dataString;
    } else {
        console.log("error");
        const error = {
            status: res.status,
            statusText: res.statusText
        };
        error.statusText = await res.text();
        const errorString = JSON.stringify(error, null, 4);
        this.result.value = errorString;
    }
};

export default { get, post };