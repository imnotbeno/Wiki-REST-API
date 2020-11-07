const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const mongoose = require("mongoose");

//Connection to mongo database
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser : true, useUnifiedTopology : true});

//Initialise ejs module
app.set("view engine", "ejs");

//Initialise body-parser module
app.use(bodyParser.urlencoded({extended:true}));

//app.use(express.static("public"));

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article =  mongoose.model("Article", articleSchema);

app.listen(3000,function(){
    console.log("Server set on port 3000!");
});