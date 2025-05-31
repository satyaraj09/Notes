import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

//middleware
app.use(cors());
app.use(express.json());


//array of notes
var notes = [];
var nextId = 1;

//GET /api
app.get('/api',(req,res)=>{
    res.send('Notes app API');
});


//GET notes
app.get('/api/notes',(req,res)=>{
    res.send(notes);
});

//POST notes
app.post('/api/notes',(req,res)=>{
    var {id, text} = req.body;
    if (!text){
        res.status(400).send('Text are required');
        return;
    }
    var newNote = {id: nextId++, text};
    notes.push(newNote);
    res.status(201).send(newNote);
});

//DELETE notes
app.delete('/api/notes/:id',(req,res)=>{
    const noteId = parseInt(req.params.id);
    notes = notes.filter((note)=>note.id !== noteId);
    res.sendStatus(204);
});

app.listen(port,()=>{
    console.log(`Server is running, http://localhost:${port}/api`);
})
