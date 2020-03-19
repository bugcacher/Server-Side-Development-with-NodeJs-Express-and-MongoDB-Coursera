const express = require('express');
const http = require('http');
const hostname = 'localhost';
const port = 3000;

const app = express();

app.use((req,res,next)=>{
    console.log(req.headers);
    res.statusCode = 200;
    res.contentType('Content-Type','text/html');
    res.end('<html><head></head><body>Welcome</body></html>');
});

const server = http.createServer(app);

server.listen(port,hostname,()=>{
console.log(`Server running on hostname : ${hostname} on port : ${port}`);
});