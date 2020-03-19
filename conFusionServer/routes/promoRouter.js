const express = require('express');

const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());


promoRouter.use(bodyParser.json());
promoRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type',"text/plain")
    next();
})
.get((req,res,next)=>{
    res.end('All the promotions will be sent to you.');
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('Invalid request : Can not perform PUT on /promotions');
})
.post((req,res,next)=>{
    res.end('Promotion '+req.body.name +' with details : '+req.body.description +' will be added.');
})
.delete((req,res,next)=>{
    res.end('All the promotions will be deleted.');
});


promoRouter.route('/:promoId')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type',"text/plain")
    next();
})
.get((req,res,next)=>{
    res.end('Promotion with id:' +req.params.promoId +' will be sent to you.');
})
.put((req,res,next)=>{
    res.write('Updating the promotion: '+req.params.promoId);
    res.end(' Promotion '+req.body.name +'with details : '+req.body.description +' will be updated.');
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('Invalid request : Can not perform POST on /promotions/'+req.params.promoId);
})
.delete((req,res,next)=>{
    res.end('Promotion with id:' +req.params.promoId +' will be deleted.');
});

module.exports = promoRouter;