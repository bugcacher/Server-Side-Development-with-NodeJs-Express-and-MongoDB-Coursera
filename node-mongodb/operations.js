const assert = require('assert');

exports.insertDocument = (db,document,collection)=>{
    const coll = db.collection(collection);
    return coll.insertOne(document);
};

exports.deleteDocument  = (db,document,collection,callback)=>{
    const coll = db.collection(collection);
   return  coll.deleteOne(document);
};

exports.updateDocument  = (db,document,update,collection,callback)=>{
    const coll = db.collection(collection);
   return coll.updateOne(document,{$set : update},null);
};

exports.findDocument  = (db,collection,callback)=>{
    const coll = db.collection(collection);
    return coll.find({}).toArray();
};