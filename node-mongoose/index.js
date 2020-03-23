const mongoose = require('mongoose');

mongoose.Promiss = require('bluebird');

const url = "mongodb://localhost:27017/conFusion";

const Dishes = require('./models/dishes');


const connect = mongoose.connect(url);

connect.then((db)=>{

    console.log("Connceted sucessfully...");

    // var newDish = Dishes({
    //     name : "singha",
    //     description : "this is the description again"
    // });
    Dishes.create({
        name : "bruce",
        description : "wayne"  
    })
    .then((result)=>{

        console.log("Dish saved",result);

        return Dishes.findByIdAndUpdate(result._id,{$set : {name:"clark"}}
        ,{
            new:true
         }
        );
    })
    .then((dish)=>{

        console.log("Updated dish",dish);

        dish.comments.push({
            rating : 4,
            comment : "this is the comment",
            author : "Abhinav"
        });

        return dish.save();
    })
    .then((dish)=>{

        console.log(dish);

        return mongoose.connection.close();
    })
    .catch((err)=>console.log("ERROR",err));
});

