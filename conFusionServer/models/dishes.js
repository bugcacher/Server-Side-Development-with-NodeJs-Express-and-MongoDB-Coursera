const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const commentSchema = new Schema({
    rating:{
        type:Number,
        max:5,
        min:1,
        required :true
    },
    author :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    comment:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const dishSchema = new Schema({
    name :{
        type : String,
        required:true,
        unique:true
    },
    description : {
        type : String,
        required:true
    },
    label:{
        type: String,
        default:''
    },
    image:{
        type: String,
        required:true
    },
    category:{
        type: String,
        required:true
    },
    featured:{
        type: Boolean,
        default:false
    },
    price :{
        type: Currency,
        required:true,
        min : 0
    },
    comments:[commentSchema]
},{
    timestamps:true
});

var Dishes = mongoose.model('Dish',dishSchema);

module.exports = Dishes;