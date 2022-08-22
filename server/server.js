const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({path: "./config.env"});
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
//get driver connection
const db = require('./config/db');

// Route to get all posts
app.get("/api/get", (req,res)=>{
    db.query("SELECT * FROM testtable", (err,result)=>{
        if(err) {
            console.log(err);
        } 
        res.send(result);
    });   

});

// Route to get one post
app.get("/api/getFromId/:id", (req,res)=>{

    const id = req.params.id;
    db.query("SELECT * FROM testtable WHERE id = ?", id, (err,result)=>{
        if(err) {
            console.log(err);
        } 
        res.send(result);
    });   
});

// Route for creating the post
app.post('/api/create', (req,res)=> {

    const username = req.body.userName;
    const title = req.body.title;
    const text = req.body.text;

    db.query("INSERT INTO posts (title, post_text, user_name) VALUES (?,?,?)",[title,text,username], (err,result)=>{
        if(err) {
            console.log(err);
        } 
        console.log(result);
    });   
})

// Route to like a post
app.post('/api/like/:id',(req,res)=>{

    const id = req.params.id;
    db.query("UPDATE posts SET likes = likes + 1 WHERE id = ?",id, (err,result)=>{
        if(err){
            console.log(err) ;  
        } 
        console.log(result);
    });    
});

// Route to delete a post

app.delete('/api/delete/:id',(req,res)=>{
    const id = req.params.id;

    db.query("DELETE FROM testtable WHERE id= ?", id, (err,result)=>{
        if(err) {
            console.log(err);
        }
    }); 
});

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`)
})