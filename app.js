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

app.get("/articles", function(req,res){
    Article.find(function(err, articlesFound){
        if(!err){
            console.log(articlesFound);
        }else{
            console.log(err);
        }
    });
});

app.post("/articles", function(req,res){
    const articleTitle = req.body.title;
    const articleContent = req.body.content;

    const newArticle = new Article({
        title: articleTitle,
        content: articleContent
    });

    newArticle.save(function(err){
        if(!err){
            res.send("All good!");
        }else{
            res.send(err);
        }
    });

});

//Requests targeting specific articles

app.route("/articles/:articleTitle")
.get(function(req,res){

    Article.findOne({title: req.params}, function(err, titlesFound){
        if(!err){
            console.log(titlesFound);
        }else{
            console.log(err);
        }
    });
});


app.delete("/articles", function(req,res){
    Article.deleteMany(function(err){
        if(!err){
            res.send("Successfully deleted all errors");
        }else{
            res.send(err);
        }
    });
});

app.listen(3000,function(){
    console.log("Server set on port 3000!");
});