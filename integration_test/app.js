const { createServer } = require('node:http');
function createApp() {
    return createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Welcome to the world wide web</h1>')
    })
}
module.exports = createApp;