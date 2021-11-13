const express = require("express");
var cors = require('cors')
const app = express();
const serverless = require("serverless-http");
// const mongoose = require("mongoose");
const {MongoClient} = require('mongodb');
const mongoose  = require("mongoose");
const { data } = require("cheerio/lib/api/attributes");
const router = express.Router();
app.use(cors())
const url = "mongodb+srv://rohini:p_Tp6Yf%40wSJ%40PRP@inshorts-news-scraper.s3hct.mongodb.net/db?retryWrites=true&w=majority"
mongoose.connect(url,{useNewUrlParser : true , useUnifiedTopology : true},
    (err , connection)=>{
        if (err) console.log(err);
        else   console.log("connected")
})
const newsSchema = mongoose.Schema({
    index:Number,
    news_title:String,
    news_content:String,
    news_image:String,
    news_url:String
})

const NewsDB = mongoose.model("NewsDB",newsSchema);

// const apple = new NewsDB({
//     index: 40 ,
//     news_url : "https://i.ibb.co/Gvg71g6/s-l640.jpg",
//     news_title : "AirPods",
//     news_image : "https://i.ibb.co/Gvg71g6/s-l640.jpg",
//     news_content: "Accessories"
// })

// apple.save((err, result)=>{
//     if (err) console.log(err);
//     else console.log(result);
// })
var data1 = [];
NewsDB.find((err,result)=>{
    if (err) {console.log("nhi hora");}
    else {
        // router.get("/",(req,res)=>{
            // res.json(result)
            console.log(result);
            data1 = result;
        // });
        // const jsonSO = ["ahppy","sad"];
        // result.forEach((document)=>{
        //     jsonSO.push(document);
        // })
        
    } 
})

app.get('/', (req, res) => {
    res.json(data1)
  })


app.listen(4000, () => {
    console.log(`This app listening at http://localhost:4000`)
  })
module.exports = app;

