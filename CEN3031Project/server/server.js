// var path = require('path')
const express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var cors = require('cors');
var config = require('./config/config.js');
var studentRouter = require('./routes/studentRouter.js')
var professorRouter = require('./routes/professorRouter.js')

// import path from 'path';
// import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import config from './config/config.js';
// import studentRouter from './routes/studentRouter.js';
// import professorRouter from './routes/professorRouter.js';

//Changed method of connecting to MongoDB to get rid of DeprecationWarning
mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(() =>
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
app.get('/', (req, res) =>
{
    res.send("Server working");
});

const port = process.env.PORT || 5000;

app.listen(port, () =>
{
    console.log(`Server listening on: http://localhost:${port}`);
});