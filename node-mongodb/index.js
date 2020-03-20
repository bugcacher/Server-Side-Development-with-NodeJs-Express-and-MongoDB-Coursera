const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';

mongoClient.connect(url,(err,client)=>{
    assert.equal(err,null);
    console.log('MongoDB server created succesfully...');

    const db = client.db('conFusion');
    const collection = db.collection("dishes");
    collection.insertOne({"key":"value","another_key":"value"},(err,result)=>{
        assert.equal(err,null);
        console.log(result.ops);

        collection.find({}).toArray((err,docs)=>{
            assert.equal(err,null);
            
            console.log('Collection found');
            console.log(docs);

            db.dropCollection("dishes",(err,result)=>{
                assert.equal(err,null);
                console.log('Collection deleted!');
                client.close();
            });
        });
    });

});