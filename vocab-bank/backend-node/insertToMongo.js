require('dotenv').config();
const {MongoClient} = require('mongodb');
const fs = require('fs');
const path = require('path');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const vocabFile = path.join(__dirname, '../data-processing/all_datasets/combined_vocab_sorted.json');


async function insertData(){
    try{
        // establish connection [await because it is establishing a connection and needs a green signal before doing next steps]
        await client.connect();
        // creates db and collection if not already present
        const db = client.db('vocabBank');
        const collection = db.collection('words');

        // read data from file
        const data = fs.readFileSync(vocabFile, 'utf-8');
        // then parse json data
        const list = JSON.parse(data);

        // then insert into collection
        const result = await collection.insertMany(list);

        console.log("Inserted data into mongodb collection");
    }catch(e){
        console.error("Error inserting data:"+e.message);
    }finally{
        await client.close();
    }
}

insertData();