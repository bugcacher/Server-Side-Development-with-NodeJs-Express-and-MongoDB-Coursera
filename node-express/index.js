const express = require('express');
const morgan = require('morgan');
const http = require('http');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('/dishes',(req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type',"text/plain")
    next();
});

app.get('/dishes',(req,res,next)=>{
    res.end('All the dished will be sent to you');
});

app.put('/dishes',(req,res,next)=>{
    res.statusCode = 403;
    res.end('Invalid request');
});

app.post('/dishes',(req,res,next)=>{
    res.end('Dish '+req.body.name +'with details : '+req.body.description +' will be added.');
});

app.delete('/dishes',(req,res,next)=>{
    res.end('All the dished will be deleted');
});
// dish with param dishId

app.get('/dishes/:dishId',(req,res,next)=>{
    res.end('Dish ' +req.params.dishId + 'will be sent to you');
});

app.put('/dishes/:dishId',(req,res,next)=>{
   res.write('Updating dish '+ req.params.dishId);
   res.end('Dish with id '+req.params.dishId +' updated.');
});

app.post('/dishes/:dishId',(req,res,next)=>{
    res.statusCode = 403;
    res.end('Invalid request');
});

app.delete('/dishes/:dishId',(req,res,next)=>{
    res.end('Dish '+req.params.dishId+ 'will be deleted');
});





app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{

    res.statusCode = 200;
    res.contentType('Content-Type','text/html');
    res.end('<html><head></head><body>Welcome</body></html>');
});

const server = http.createServer(app);

server.listen(port,hostname,()=>{
console.log(`Server running on hostname : ${hostname} on port : ${port}`);
});