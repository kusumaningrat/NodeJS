const { MongoClient } = require('mongodb');
const uri = "mongodb://127.0.0.1:27017";
const dbname = 'belajar_mongoose';

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

client.connect((err,client) => {
    if(err){
        return console.log('Connection Failed');
    };

    console.log('Connected');
    client.close();
});