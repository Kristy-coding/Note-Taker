
const express = require('express');

const PORT = process.env.PORT || 3002;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// middleware 
// allows static assests to be pulled from server to client
app.use(express.static('public'))
// tell express how to handle data 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(apiRoutes)
app.use(htmlRoutes)


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });