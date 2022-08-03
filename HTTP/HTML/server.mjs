import { createServer } from 'node:http';

const server = createServer((req, res) => {
    console.log('request has been recieved');

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");

    res.end('<html><body><h1>This is a response from the server</h1></body></html>');

})
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});