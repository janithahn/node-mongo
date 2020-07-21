const MongoClient = require('mongodb');
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url).then((client) => {

    console.log('Connected correctly to the sever');

    const db = client.db(dbname);
    
    dboper.inserDocument(db, {name: "Vadonut", document: "Test description"}, 'dishes')
        .then((result) => {
            console.log('Insert Document:\n', result.ops);

            return dboper.findDocument(db, 'dishes')

        })
        .then((docs) => {
            console.log('Found Documents:\n', docs);

            return dboper.updateDocument(db, {name: 'Vadonut'}, {description: "this is the updated field"}, 'dishes')
        
        })
        .then((result) => {
            console.log('Updated Document:\n', result.result);

            return dboper.findDocument(db, 'dishes')
        
        })
        .then((docs) => {
            console.log('Found Documents:\n', docs);

            return db.dropCollection('dishes')
        
        }).then((result) => {
            console.log('Dropped Collention: ', result);

            client.close();

        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));