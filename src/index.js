import express, { response } from "express"
// import { client } from "./db"
import taskRouter from "./routes/taskRoutes.js"
import path, {dirname} from "node:path"
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log(__dirname)


const app=express()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { title: 'Page d\'Accueil', message: 'Bienvenue sur Express avec EJS!' });
  });


app.use(express.json())
app.use("/task", taskRouter)

// app.get("/",(request,response)=>{
//     client.connect()
//     return response.json({message:"hello world"})
// })


// connectDB().then((client)=> {
//     //  app.get('/test', async (request, response) => {
//     //     try {
//     //         const usersCollection = db.collection('users'); 
//     //         const users = await usersCollection.find().toArray(); 
//     //         res.json(users);
//     //     } catch (error) {
//     //         res.status(500).json({ error: 'Failed to fetch users' });
//     //     }
//     // });
    
// });

app.listen(3000,()=>{
    console.log("serve")
})  