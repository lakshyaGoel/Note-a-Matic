export function isSet(param, defaultValue){
    var result = param;
    if(typeof param === "undefined"){
        result = defaultValue;
    }
    return result;
}


// use in client(ReactComponent Class) to set auth header for check login)
export function getAuthorizationHeader() {
    const token = localStorage.getItem('access_token');
    return !token ? {} : {
        'Authorization': `Bearer ${token}`
    };
}

export function getUserId(profile){
    let request = new Request('/api/db/user-info', {
        method: 'POST',
        headers: {
            "Authorization": getAuthorizationHeader().Authorization,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile),
    });
    fetch(request).then(response => {return response;});
}