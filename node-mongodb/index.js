const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dbOperationHelper = require('./operations');

const url = 'mongodb://localhost:27017/';


mongoClient.connect(url).then((client)=>{

    const db = client.db('conFusion');
    const collection = db.collection("dishes");

    dbOperationHelper.insertDocument(db,{name:"Abhinav",surname:"Singh"},"dishes")
    .then((result)=>{

        console.log("Document inserted ",result.ops);

        return dbOperationHelper.findDocument(db,"dishes");
        })
        .then((docs)=>{

            console.log("Document found ",docs);

            return dbOperationHelper.updateDocument(db,{name:"Abhinav"},{surname:"Wayne"},"dishes");
            })
            .then((doc)=>{

                console.log("Document updated ",doc.result);
                
                return  dbOperationHelper.findDocument(db,"dishes");
                })
                .then((docs)=>{
                   
                    console.log("Updated Document found ",docs);

                    return db.dropCollection("dishes");
                     })
                    .then((result)=>{

                            console.log("Dropped Collection ",result);

                             return client.close();
                    });
                    

},(err)=>console.log("ERROT"))
.catch((err)=>{
    console.log("Error");
});
