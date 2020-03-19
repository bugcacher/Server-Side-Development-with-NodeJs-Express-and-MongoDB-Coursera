const http = require('http');

const fs = require('fs');
const path = require('path');
const hostname = 'localhost';
const port = '3000';

const server = http.createServer((req,res)=>{

    if(req.method=='GET'){
        var fileUrl;
        if(req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url;

        var filePath = path.resolve('./public'+fileUrl);
        var fileExtension = path.extname(filePath);

        if(fileExtension=='.html'){
            fs.exists(filePath,(exists)=>{
                if(!exists){
                    res.statusCode = 404;
                    res.setHeader('content-type','text/html');
                    res.end('<html><head></title></head><body><h1>Error 404!</h1><p>File not found. </p></body></html>');
                    return;
                }
                res.statusCode = 200;
                res.setHeader('content-type','text/html');
                fs.createReadStream(filePath).pipe(res);
            });
        }
        else{
            res.statusCode = 404;
            res.setHeader('content-type','text/html');
            res.end('<html><head></title></head><body><h1>Error 404!</h1><p>Not an HTML file. </p></body></html>');
        }

    }

    else{
        res.statusCode = 404;
        res.setHeader('content-type','text/html');
        res.end('<html><head></head><body><h1>Error 404!</h1><p>Method not supported! :( </p></body></html>');
    }
    
});

server.listen(port,hostname,()=>{
    console.log(`Server Running.... with port ${port} and host ${hostname}`);
});