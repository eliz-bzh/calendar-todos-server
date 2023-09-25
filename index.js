const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 3001;
const MongoClient = require('mongodb').MongoClient;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");


(async () => {
    try {
       await mongoClient.connect();
       app.locals.collection = mongoClient.db("mongo").collection("todos");
   }catch(err) {
       return console.log(err);
   } 
})();

app.get('/', (req, res) => {
    res.status(200).send("<h1>Hello</h1>");
});
 
app.get('/api/todos', async(req, res) => {
   const collection = req.app.locals.collection;
   try{
        const todos = await collection.find({}).toArray();
        res.status(200).send(todos);
   }
   catch(err){
       console.log(err);
       res.sendStatus(500);
   }  
});

app.get('/api/todosByDate', async(req, res) => {
    const collection = req.app.locals.collection;
    const { date } = req.body;
    try{
        const todos = await collection.find({ date: date }).toArray();
        res.send(todos);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})

app.post('/api/todos', async(req, res) =>{
    const collection = req.app.locals.collection;
    const { date, todo } = req.body;
    try{
        await collection.insertOne({
            date: date,
            todo: todo
        });
        res.status(200).send('add');
    }
    catch(err){
        res.sendStatus(500);
    }
})


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})