const express = require("express");
const app = express();
const serverless = require("serverless-http");
const mongoose = require("mongoose");
const router = express.Router();
const url = "mongodb+srv://admin:dbpassword@clustertest.os5rj.mongodb.net/ecom?retryWrites=true&w=majority"
mongoose.connect(url,{useNewUrlParser : true , useUnifiedTopology : true},
    (err , connection)=>{
        if (err) console.log(err);
        else console.log("connection successful");
    })

const productsSchema = mongoose.Schema({
    imgUrl : String,
    productName : String,
    rating : Number,
    price : Number,
    type : String
})

const Product = mongoose.model("ProductsAll",productsSchema);

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

Product.find((err,result)=>{
    if (err) {console.log(err);}
    else {
        router.get("/",(req,res)=>{
            res.json(result)
        });
        // const jsonSO = ["ahppy","sad"];
        // result.forEach((document)=>{
        //     jsonSO.push(document);
        // })
        
    } 
})


app.use(`/.netlify/functions/server`, router);



module.exports = app;
module.exports.handler = serverless(app);
