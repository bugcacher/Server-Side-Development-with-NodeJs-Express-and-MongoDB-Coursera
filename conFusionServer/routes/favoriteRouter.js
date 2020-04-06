const express = require('express');
const bodyParser = require('body-parser');
const favoriteRouter = express.Router();
const authenticate = require('../authenticate');
const Favorites = require('../models/favorites');

favoriteRouter.use(bodyParser.json());

// for /favorites

favoriteRouter.route('/')
.get(authenticate.verifyUser, (req,res,next)=>{
    Favorites.findOne({"user":req.user._id})
    .populate('user')
    .populate('dishes')
    .then((dishes)=>{
        res.statusCode = 200;
        res.setHeader('content-type','application/json')
        res.json(dishes);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(authenticate.verifyUser, (req,res,next)=>{
    Favorites.findOne({"user":req.user._id})
    .then((favorites)=>{
        if(favorites!=null){
            for(var i =0;i<req.body.length;i++){
                favorites.dishes.push(req.body[i]._id);
            }
            favorites.save()
            .then((resp)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            },(err)=>next(err))
            .catch((err)=>next(err));
        }
        else{
            Favorites.create({
                "user":req.user._id,
                "dishes":req.body})
                .then((resp)=>{
                    res.statusCode = 200;
                    res.setHeader('content-type','application/json')
                    res.json(resp);
                },(err)=>next(err))
                .catch((err)=>next(err));
        }
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put(authenticate.verifyUser, (req,res,next)=>{
 res.statusCode = 403;
 res.end('PUT operation not allowed on /favorites');
})
.delete(authenticate.verifyUser, (req,res,next)=>{
    Favorites.findOneAndRemove({"user":req.user._id})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type',"application/json");
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

// for /favorites/:dishId

favoriteRouter.route('/:dishId')
.get(authenticate.verifyUser, (req,res,next)=>{
    res.statusCode = 403;
    res.end('GET operation not allowed on /favorites/'+req.params.dishId);
})
.post(authenticate.verifyUser, (req,res,next)=>{
    Favorites.findOne({"user":req.user._id})
    .then((favorites)=>{
        if(favorites!==null){
            if(favorites.dishes.indexOf(req.params.dishId) === -1)
            {
                favorites.dishes.push(req.params.dishId)
                favorites.save()
                .then((resp)=>{
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(resp);
                },(err)=>next(err))
                .catch((err)=>next(err));
            }
            
        }
        else{
            Favorites.create({
                "user":req.user._id,
                "dishes":[req.params.dishId]})
                .then((resp)=>{
                    res.statusCode = 200;
                    res.setHeader('content-type','application/json')
                    res.json(resp);
                },(err)=>next(err))
                .catch((err)=>next(err));
        }
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put(authenticate.verifyUser, (req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not allowed on /favorites/'+req.params.dishId);
})
.delete(authenticate.verifyUser, (req,res,next)=>{
    Favorites.findOne({"user":req.user._id})
    .then((favorite)=>{
        if(favorite!=null){
            if(favorite.dishes.indexOf(req.params.dishId) >= -1){
                favorite.dishes.remove(req.params.dishId);
                favorite.save()
                .then((resp)=>{
                    res.statusCode = 200;
                    res.setHeader('content-type','application/json')
                    res.json(resp);
                },(err)=>next(err))
                .catch((err)=>next(err));
            }
            else{
                var err = new Error('Dish not found in your favorites.');
                err.stattus = 404;
                next(err);
            }
        }
        else{
            var err = new Error('Favorites not found!');
            err.stattus = 404;
            next(err);
        }
    },(err)=>next(err))
    .catch((err)=>next(err));
});



module.exports = favoriteRouter;