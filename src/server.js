const express = require("express");
const app = express();
const serverless = require("serverless-http");
// const mongoose = require("mongoose");
const {MongoClient} = require('mongodb');
const mongoose  = require("mongoose");
const router = express.Router();
const url = "mongodb+srv://rohini:p_Tp6Yf%40wSJ%40PRP@inshorts-news-scraper.s3hct.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(url,{useNewUrlParser : true , useUnifiedTopology : true},
    (err , connection)=>{
        if (err) console.log(err);
        else   console.log(connection.Mongoose)
})
const newsSchema = mongoose.Schema({
    
})

const NewsDB = mongoose.model("NewsDB",newsSchema);

// const apple = new Product({
//     imgUrl : "https://i.ibb.co/Gvg71g6/s-l640.jpg",
//     productName : "AirPods",
//     rating : 4,
//     price : 200,
//     type: "Accessories"
// })

// apple.save((err, result)=>{
//     if (err) console.log(err);
//     else console.log(result);
// })

NewsDB.find((err,result)=>{
    if (err) {console.log("nhi hora");}
    else {
        // router.get("/",(req,res)=>{
            // res.json(result)
            console.log(result)
        // });
        // const jsonSO = ["ahppy","sad"];
        // result.forEach((document)=>{
        //     jsonSO.push(document);
        // })
        
    } 
})


app.use(`/`, router);



module.exports = app;

