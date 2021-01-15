const path = require('path');
const router = require('express').Router();

//The following HTML routes should be created:

//GET * should return the index.html file

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

//GET /notes should return the notes.html file.

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'))
});

// * always goes as the last route
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});




module.exports = router;