const express = require('express');
const morgan = require('morgan');
const http = require('http');
const bodyParser = require('body-parser');

const dishRouter = require('./Routes/dishRouter');
const promoRouter = require('./Routes/promoRouter');
const leaderRouter = require('./Routes/leaderRouter');


const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);


app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{

    res.statusCode = 200;
    res.contentType('Content-Type','text/html');
    res.end('<html><head></head><body>Welcome</body></html>');
});

const server = http.createServer(app);

server.listen(port,hostname,()=>{
console.log(`Server running at http://${hostname}/${port}/`);
});