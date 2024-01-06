const express = require('express');
const connect = require('./db');
const cookie = require("cookie-parser");
const userRouter = require('./controller');
const jwt = require("jsonwebtoken");
const cors=require("cors");
const app = express();
app.use(cookie());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.set("views",__dirname + "/views");
app.use(express.static(__dirname + "/public"));

app.use("/user",userRouter);

app.listen(8090,()=>{
    console.log("listening on port 8090");
    connect();
})



