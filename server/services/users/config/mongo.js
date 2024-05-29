require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URL


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let db;

async function mongoConnect() {
    try {
        const database = client.db('bentomart-db');
        db = database
        return database
    } catch(error) {
        console.log(error)
    }
}
mongoConnect().catch(console.dir);

function getDb() {
    return db
}

module.exports = {mongoConnect, getDb}
