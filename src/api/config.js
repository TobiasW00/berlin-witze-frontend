let servername = (window.location.hostname.indexOf("localhost") === -1) ? window.location.hostname : window.location.hostname +":9998";
let secure = (window.location.protocol === 'https:');
export const HTTP_URL = ((secure) ? "https://": "http://") + servername;
export const WS_URL = ((secure) ? "wss://": "ws://") + servername + "/ws";
