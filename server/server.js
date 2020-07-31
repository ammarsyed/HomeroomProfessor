// var path = require('path')
const express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var cors = require('cors');
// var config = require('./config/config.js');
var studentRouter = require('./routes/studentRouter.js')
var professorRouter = require('./routes/professorRouter.js')
const path = require('path');

//Changed method of connecting to MongoDB to get rid of DeprecationWarning
mongoose.connect(process.env.DB_URI || require('./config/config.js').db.uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(() =>
{
    console.log(`Successfully connected to MongoDB.`)
});

const app = express();

app.use(cors())

//Bodyparser Middleware
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// Middleware for API
app.use('/api/students', studentRouter);

app.use('/api/professors', professorRouter);

//home route
// app.get('/', (req, res) =>
// {
//     res.send("Server working");
// });


if(process.env.NODE_ENV === 'production')
{
    // cd CEN3031Project/client npm run build
    // app.use(express.static('../client/build'));

    // app.use(express.static(path.join(__dirname, '../client/build')));

    app.use(express.static(path.join(__dirname, '../client/build')));


    app.get('*', (req, res) =>
    {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html')); //try path.resolve?
    })

}


const port = process.env.PORT || 5000;

app.listen(port, () =>
{
    console.log(`Server listening on: http://localhost:${port}`);
});