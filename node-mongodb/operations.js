const assert = require('assert');

exports.insertDocument = (db,document,collection,callback)=>{
    const coll = db.collection(collection);
    coll.insertOne(document,(err,result)=>{
       assert.equal(err,null);
        console.log("Document Inserted");
        callback(result);
    });
};

exports.deleteDocument  = (db,document,collection,callback)=>{
    const coll = db.collection(collection);
    coll.deleteOne(document,(err,result)=>{
        assert.equal(err,null);
        console.log("Document deleted");
        callback(result);
    });
};

exports.updateDocument  = (db,document,update,collection,callback)=>{
    const coll = db.collection(collection);
    coll.updateOne(document,{$set : update},null,(err,result)=>{
       // assert.equal(err,null);
        console.log("Document updated");
        callback(result);
    });
};

exports.findDocument  = (db,collection,callback)=>{
    const coll = db.collection(collection);
    coll.find({}).toArray((err,result)=>{
        assert.equal(err,null);
        console.log("Found Documents");
        callback(result);
    });
};