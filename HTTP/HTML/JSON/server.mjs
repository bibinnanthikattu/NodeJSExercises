import { createServer } from "node:http";

const server = createServer((req, res) => {
    console.log('request recieved');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const jsonResponse = JSON.stringify({ location: "mars" });
    res.end(jsonResponse)

});
server.listen(3000, () => {
    console.log('server is running on http://localhost:3000');
})

// to run the server using curl = curl http://lcoalhost:3000 