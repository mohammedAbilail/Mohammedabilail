/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name:    Student ID:     Date: 
*  Cyclic Link:   
********************************************************************************/

const express = require("express");
const app = express();
var cors = require('cors');
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();

const HTTP_PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
require('dotenv').config();

app.get("/", (req, res) => {
    res.json({ message: 'API Listening' });
});

app.post("/api/movies", (req, res) => {
    db.addNewMovie(req.body).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        console.status(500).log(err);
    })
});

app.get("/api/movies", (req, res) => {
    var page = req.query.page;
    var perPage = req.query.perPage;
    var title = req.query.title;
    db.getAllMovies(page, perPage, title).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.status(500).log(err);
    })
});

app.get("/api/movies/:_id", (req, res) => {
    db.getMovieById(req.params._id).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.status(500).log(err);
    })
});

app.put("/api/movie/:id", (req, res) => {
    db.updateMovieById(req.body, req.params._id).then((data) => {
        res.json("Movie Updated");
    })
});

app.delete("/api/movies/:id", (req, res) => {
    db.deleteMovieById(req.params._id);
    res.status(204).end();
});

db.initialize(process.env.MONGODB_CONN_STRING)
    .then(() => {
        app.listen(HTTP_PORT);
    }).catch((err) => {
        console.log(err);
    });