const express = require('express'); 
const Parse = require('parse/node');
var nodeExcel=require('excel-export');
var cors = require('cors')
const app = express();
const http = require('http');
const server = http.Server(app);
const APP_ID = 'yzSgYjxLgfCBjZglhpjns8OKE7fbGi5L0HLdWX9n';
const JAVASCRIPT_KEY = "6s0vo0r6hpnUm99lvijDwL7pB7KRXvdmjb6Jr1wN";
const excel = require('node-excel-export');
const fs= require('fs');
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
console.info("Initializing Application", APP_ID);
Parse.initialize(APP_ID, JAVASCRIPT_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/'
global.specification;
var dataset=[];
global.heading;
const Event = Parse.Object.extend("GRItems");
const event = new Event();
const eventQuery = new Parse.Query(Event);
var MongoClient = require('mongodb').MongoClient;
//Create a database named "mydb":
var url = "mongodb://otc:OtCPasSwOrDMoNgO@13.232.110.16:27100/otc";


  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  

app.use(cors({credentials: true, origin: true}));
app.get('/excel11',function(req,res){ 

var GameScore = Parse.Object.extend("Receivers");
var query = new Parse.Query(GameScore);
query.limit(7000);
arr=[];

query.find() 
.then((gameScore) => {
  var length = gameScore.length;
  console.log(length);
  for(i=1;i<=length;i++){
  
 var objectId = gameScore[i].id;
 var createdAt= gameScore[i].get("createdAt");
 var updatedAt = gameScore[i].get("updatedAt");
 var ACL = gameScore[i].get("ACL");
 var name= gameScore[i].get("name");
  var gstNo = gameScore[i].get("gstNo");
 

  a={
   objectId:objectId,
   createdAt:createdAt,
   updatedAt: updatedAt,
   ACL:ACL,
   name:name,
   gstNo:gstNo
   }
    arr.push(a);
  
}


}).catch((ERR)=>{
  return res.send(JSON.stringify({arr:arr}));
});

});

app.post('/datevalue',function(req,res){
  var startdate = {"__type":"Date","iso":req.body.startDate};
  startdate = new Date(startdate.iso);
  var enddate = {"__type":"Date","iso":req.body.endDate};
  enddate = new Date(enddate.iso);
 MongoClient.connect(url,function(err,db){
   if(err) throw err;
   
   console.log(startdate);
   console.log(enddate);
   myvar={
    "createdAt": {
    $gte: req.body.startDate,
    $lt : req.body.endDate
}}
   db.collection("GRReports").find(myvar).toArray(function(err,result){
  console.log(result);
  return res.send(JSON.stringify({arr:result}));
})
 })

});
app.get('/excel',function(req,res){
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    
  db.collection("GRReports").find({}).toArray(function(err, result) {
    if (err) throw err;
    
    return res.send(JSON.stringify({arr:result}));
  });
   
  });
  
}); 
server.listen(3000,function(){
  console.log('server running')
});
