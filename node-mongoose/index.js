const mongoose = require('mongoose');

mongoose.Promiss = require('bluebird');

const url = "mongodb://localhost:27017/conFusion";

const Dishes = require('./models/dishes');


const connect = mongoose.connect(url);

connect.then((db)=>{

    console.log("Connceted sucessfully...");

    var newDish = Dishes({
        name : "singha",
        description : "this is the description again"
    });

    newDish.save()
    .then((result)=>{

        console.log("Dish saved",result);

        return Dishes.find({});
    })
    .then((dishes)=>{

        console.log(dishes);

        return Dishes.deleteOne({name:"abhinav"});
    })
    .then(()=>{

        return mongoose.connection.close();
    })
    .catch((err)=>console.log("ERROR",err));
});

