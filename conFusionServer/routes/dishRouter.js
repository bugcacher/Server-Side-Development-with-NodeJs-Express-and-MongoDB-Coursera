const express = require('express');

const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());
dishRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type',"text/plain")
    next();
})
.get((req,res,next)=>{
    res.end('All the dishes will be sent to you.');
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('Invalid request : Can not perform PUT on /dishes');
})
.post((req,res,next)=>{
    res.end('Dish '+req.body.name +' with details : '+req.body.description +' will be added.');
})
.delete((req,res,next)=>{
    res.end('All the dishes will be deleted.');
});


dishRouter.route('/:dishId')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type',"text/plain")
    next();
})
.get((req,res,next)=>{
    res.end('Dish with id:' +req.params.dishId +' will be sent to you.');
})
.put((req,res,next)=>{
    res.write('Updating the dish: '+req.params.dishId);
    res.end(' Dish '+req.body.name +'with details : '+req.body.description +' will be updated.');
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('Invalid request : Can not perform POST on /dishes/'+req.params.dishId);
})
.delete((req,res,next)=>{
    res.end('Dish with id:' +req.params.dishId +' will be deleted.');
});

module.exports = dishRouter;