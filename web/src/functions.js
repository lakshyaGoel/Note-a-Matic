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