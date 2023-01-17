//Setup
const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const cors=require('cors');
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();


app.use(bodyParser.json());
app.use(cors());
require('dotenv').config(); 
app.use(express.json());

app.get('/',(req,res)=>{
    res.json({message: "API Listening"});
})

app.post("/api/movies", (req, res) => {
    db.addNewMovie(req.body).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
    })
});

app.get("/api/movies", (req, res) => {
    var page = req.query.page;
    var perPage = req.query.perPage;
    var title = req.query.title;
    db.getAllMovies(page, perPage, title).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
    })
});

app.get("/api/movies/:_id", (req, res) => {
    db.getMovieById(req.params._id).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
    })
});

app.put("/api/movie/:_id", (req, res) => {
    db.updateMovieById(req.body, req.params._id).then((data) => {
        console.log("Successfully updated a movie!");
    }).catch((err) => {
        console.log(err);
    })
});

app.delete("/api/movies/:_id", (req, res) => {
    db.deleteMovieById(req.params._id).then((data) => {
        console.log("Successfully deleted a movie!");
    }).catch((err) => {
        console.log(err);
    })
});

db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});
