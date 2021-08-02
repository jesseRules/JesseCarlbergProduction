const HttpsAgent = require('agentkeepalive').HttpsAgent;
console.log('setting up proxy');
let url = 'https://localhost:44304';  //add your localhost here
var proxySettings = {
    target: url,
    secure: false,
    logLevel: 'debug',
    changeOrigin: true,
    agent: new HttpsAgent({
        maxSockets: 100,
        keepAlive: true,
        maxFreeSockets: 10,
        keepAliveMsecs: 1000,
        timeout: 60000,
        freeSocketTimeout: 30000,
    }),
    onProxyRes: proxyRes => {
        let key = 'www-authenticate';
        proxyRes.headers[key] = proxyRes.headers[key] && proxyRes.headers[key].split(',');
    }
};
module.exports = {
    '/api': proxySettings,
    '/help': proxySettings
}

