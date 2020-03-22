const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dbOperationHelper = require('./operations');

const url = 'mongodb://localhost:27017/';

mongoClient.connect(url,(err,client)=>{
    assert.equal(err,null);
    console.log('MongoDB server created succesfully...');

    const db = client.db('conFusion');
    const collection = db.collection("dishes");
    
    dbOperationHelper.insertDocument(db,{name:"abhinav",surname:"singh"},"dishes",(result)=>{
        console.log("Inserted",result.ops);

        dbOperationHelper.findDocument(db,"dishes",(result)=>{
            console.log("Found Document",result);

            dbOperationHelper.updateDocument(db,{name:"abhinav",},{surname:"singhhhh"},"dishes",(result)=>{
                console.log("Updated",result.result);

                dbOperationHelper.findDocument(db,"dishes",(result)=>{
                    console.log("Found Document",result);

                    db.dropCollection("dishes",(result)=>{
                        console.log("Collection deleted!");
                        client.close();
                    });
                 });
             });
         });


    });

});
