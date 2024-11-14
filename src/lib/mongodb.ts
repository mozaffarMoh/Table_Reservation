import { MongoClient } from 'mongodb';

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI!;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  console.error("Please add your Mongo URI to .env");
}


client = new MongoClient(uri);
clientPromise = client.connect().catch(error => {
  console.error("Failed to connect to MongoDB:", error);
  throw error;
});

export default clientPromise;