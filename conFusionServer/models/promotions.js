const mongoose = require('mongoose');
const Schema = mongoose.Schema;


require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const promtionSchema = new Schema({
    name :{
        type : String,
        required:true
    },
    image : {
        type : String,
        required:true
    },
    label :{
        type : String,
        default:''
    },
    description :{
        type : String,
        required:true
    },
    featured:{
        type : Boolean,
        required:true
    },
    price :{
        type : Currency,
        required:true
    }
},{
    timestamps:true
});

var Promotions = mongoose.model('promotion',promtionSchema);
module.exports = Promotions;