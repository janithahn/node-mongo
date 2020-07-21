const MongoClient = require('mongodb');
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);

    console.log('Connected correctly to the sever');

    const db = client.db(dbname);
    
    dboper.inserDocument(db, {name: "Vadonut", document: "Test description"}, 'dishes', (result) => {
        console.log('Insert Document:\n', result.ops);

        dboper.findDocument(db, 'dishes', (docs) => {
            console.log('Found Documents:\n', docs);

            dboper.updateDocument(db, {name: 'Vadonut'}, {description: "this is the updated field"}, 'dishes', (docs) => {
                console.log('Updated Document:\n', result.result);

                dboper.findDocument(db, 'dishes', (docs) => {
                    console.log('Found Documents:\n', docs);

                    db.dropCollection('dishes', (result) => {
                        console.log('Dropped Collention: ', result);

                        client.close();
                    });
                });
            });
        });
    });
});