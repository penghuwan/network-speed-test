const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;
    let data = null;
    let targetPath = null;
    if (pathname === '/') {
        pathname = '/index.html'
    }
    targetPath = `.${pathname}`;
    if (fs.existsSync(targetPath)) {
        data = fs.readFileSync(targetPath);
        res.statusCode = 200;
        res.end(data);
    }
}).listen(3000);