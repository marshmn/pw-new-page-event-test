const {createServer} = require('node:http');
const hostname = '0.0.0.0';
const port = 3000;
const server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Test</h1><a href="/" target="_blank">Link</a></body></html>');
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
