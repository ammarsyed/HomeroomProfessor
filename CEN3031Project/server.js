const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
//promise based so added .then
mongoose.connect(db)
    .then(()=>console.log('MongoDB Connected!'))
    .catch(err => console.log(err));

//home route
app.get('/', (req, res) => {
    console.log("homepage");
    res.send("SUP");
});


// const port = process.env.PORT || 5000;
const port = 5000;
app.listen(port, ()=>console.log(`Server started on port ${port}`));