

export function postRequest(token){
    setCookie("token", token, 1)
}

export function preRequest(token){
    return "Bearer " + getCookie(token)
}

function setCookie(name, value = "", days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value  + expires + "; path=/; SameSite=Strict";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

export function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export const API_AUTH = "https://chatr410.alwaysdata.net/R401/r401-Auth/api/endpoint.php"
export const API_APP_BASE = "https://lestitansdesete.alwaysdata.net/R401/r401-App/api/"
