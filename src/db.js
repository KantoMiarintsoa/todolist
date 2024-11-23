import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017/todolist"; 
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();  
        // console.log("Connected to MongoDB");
        return client.db("todolist");  
    } catch (error) {
        console.error("Error lors de la connexion à MongoDB:", error);
    }
}

export { client, connectDB };  
