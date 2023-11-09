import { MongoClient } from 'mongodb'

const mongodb_url: string = process.env.MONGODB_URI as string

const client = new MongoClient(mongodb_url, {
    monitorCommands: true
})

async function listDatabases(client: MongoClient) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

export async function connectToDatabase() {
    console.log(mongodb_url)
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await listDatabases(client);

    } catch (e) {
        console.error("error",mongodb_url,e);
    } finally {
        console.log("database contnected!")
    }
    const db = client.db('blog')
    return { db, client }
}