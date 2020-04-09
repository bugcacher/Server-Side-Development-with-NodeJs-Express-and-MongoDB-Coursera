const express = require('express');

const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

const Promotions = require('../models/promotions');


promoRouter.use(bodyParser.json());

//for /promotions
promoRouter.route('/')
.get((req,res,next)=>{
    Promotions.find({})
    .then((promotion)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type',"application/json");
        res.json(promotion);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('Invalid request : Can not perform PUT on /promotions');
})
.post((req,res,next)=>{
    Promotions.create(req.body)
    .then((promotion)=>{
        console.log('Promotion created',promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type',"text/json");
        res.json(promotion);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.delete((req,res,next)=>{
    Promotions.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type',"application/json");
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

//for /promotions/:promotionId

promoRouter.route('/:promotionId')
.get((req,res,next)=>{
    Promotions.findById(req.params.promotionId)
    .then((promotion)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type',"application/json");
        res.json(promotion);  
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put((req,res,next)=>{
    Promotions.findByIdAndUpdate(req.params.promotionId,{$set : req.body},{new:true})
    .then((promotion)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type',"application/json");
        res.json(promotion);  
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('Invalid request : Can not perform POST on /promotions/'+req.params.promotionId);
})
.delete((req,res,next)=>{
    Promotions.findByIdAndRemove(req.params.promotionId)
    .then((promotion)=>{
        res.statuscode = 200;
        res.setHeader('Content-Type',"application/json");
        res.json(promotion);  
    },(err)=>next(err))
    .catch((err)=>next(err));
});

module.exports = promoRouter;
