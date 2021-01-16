const path = require('path');
const router = require('express').Router();
const fs = require('fs');

 // to create unique id (npm package that I installed)
 const { v4: uuidv4 } = require('uuid');

 //path.join(__dirname,'/') is finding defining the path to your computer and joining it witht he route
 const dbPath = path.join(__dirname,'../../db/db.json')

//API routes deal with JSON data , html routes serve static files

//GET /api/notes should read the db.json file and return all saved notes as JSON.
router.get('/api/notes',(req, res)=> {

        fs.readFile(dbPath, 'utf8',(err, data) =>{
            if (err) {
                console.log(err)
            } 
            // parse into js array
            const notes = JSON.parse(data);
            res.json(notes)
        });    
})

// //POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
router.post('/api/notes',(req, res)=>{

    
    // read file  
        fs.readFile(dbPath, 'utf8',(err, data) =>{
            if (err) {
                console.log(err)
            } 
            // parse into js array, always need to parse the data even if it's already in JSON?
            const notes = JSON.parse(data);
            // the newNote is going to equal whatever was added to the body via the post request on the fron the front end, we are taking that and adding it to the back end
            const newNote = req.body
            newNote.id = uuidv4();
            // push req.body into array 
            notes.push(req.body);
            // wrtie to the file and re save 
            fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
                res.send('file saved')
            });
        });
    
})


// You haven’t learned how to handle DELETE requests, but this application has that functionality in the front end. As a bonus, see if you can add the DELETE route to the application using the following guideline:

    //DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.

    // deleteNote()
router.delete('/api/notes/:id', (req, res)=> {

        // the value of id = req.params.id (the key will be captured in :id)
        chosen = req.params.id
        // read all the notes from the db.json
        fs.readFile(dbPath, 'utf8',(err, data) =>{
            if (err) {
                console.log(err)
            }
            // When receiving data from a web server, the data is always a string. 
            //Parse the data with JSON.parse(), and the data becomes a JavaScript object.
            const notes = JSON.parse(data);
            // notes is an array of notes 
            //console.log(notes)
            res.json(notes)
            //remove the note with the given id property
            for (let i =0; i < notes.length; i++) {
                if (notes[i].id === chosen){
                // array.splice(index, howmany, item1, ....., itemX) 
                // I spliced the array at position/index [i] and removed one item (starting at index [i] therefore the notes at index [i] was removed) and splice will return the updated array
                    notes.splice([i],1)
                    console.log(notes)
                    // rewrite the notes to the db.json file
                fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                    // got a weird error when I had res.send() something about setting the header, changed it to res.end and it worked 
                    res.end()
                });
                }
            }
            
        })
         
})

module.exports = router;