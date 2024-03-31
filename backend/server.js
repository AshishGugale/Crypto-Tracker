import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import 'dotenv/config';
import TodoItem from "./models/TodoItem.js";

const PORT = 3002; 
const MONGOURL = process.env.MONGOURL;

const app = express();
app.use(express.json());
app.use(cors());

app.get('/todos/getAll', async (req, res) => {
    try {
        const data = await TodoItem.find({});
        res.status(200).send(data);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
})

app.get('/todos/:id', async (req, res) => {
    try {
        const item = await TodoItem.findOne({ UUID: req.params.id });
        res.status(200).send(item);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
})

app.post('/todos/create', async (req, res) => {
    try {
        const newItem = {
            title: req.body.title,
            UUID: req.body.UUID,
            isCompleted: req.body.isCompleted,
            Deadline: req.body.Deadline
        }
        await TodoItem.create(newItem);
        res.status(201).send("Created successfully");
    }
    catch (err) {
        res.status(401).send(err.message);
    }
})

app.delete('/todos/delete/:id', async (req, res) => {
    try {
        await TodoItem.findOneAndDelete({UUID: req.params.id});
        res.status(202).send("Deleted successfully");
    }
    catch (err){
        res.status(401).send(err.message);
    }
})

app.put('/todos/edit/', async (req, res) => {
    try {
        const CurrItem = await TodoItem.findOne({ UUID: req.body.UUID });
        if(req.body.isCompleted !== undefined)
            CurrItem.isCompleted = req.body.isCompleted;
        if (req.body.title !== undefined)
            CurrItem.title = req.body.title;
        if (req.body.Deadline !== undefined)
            CurrItem.Deadline = req.body.Deadline;
        await CurrItem.save();
        res.status(200).send("Updated successfully");
    }
    catch (err) {
        res.status(402).send(err.message);
    }
})

app.get('/', (req, res) => {
    res.send('Hello, this is your Express server!');
});
mongoose
    .connect(MONGOURL)
    .then(() => {
        console.log("App connected to DB!!");
        app.listen(PORT, () => {
            console.log("App is listening on port: ", PORT);
        });
    })
    .catch((err) => {
        console.log("Failed: ", err.mongoose);
    })