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

//Create a database named "mydb":
app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  

app.use(cors({credentials: true, origin: true}));
app.get('/excel',function(req,res){ 

var GameScore = Parse.Object.extend("GRReports");
var query = new Parse.Query(GameScore);
query.limit(7000);
arr=[];

query.find() 
.then((gameScore) => {
  var length = gameScore.length;

  for(i=1;i<=length;i++){
 var GR_No = gameScore[i].get("GR_No");
 var from = gameScore[i].get("from");
 var route = gameScore[i].get("route");
 var description= gameScore[i].get("description");
  var nugType = gameScore[i].get("nugType");
  var nug = gameScore[i].get("nug");
  var weight = gameScore[i].get("weight");
  var ratePerKg = gameScore[i].get("ratePerKg");
  var freight = gameScore[i].get("freight");
  var format = gameScore[i].get("format");
  
  var pvtMarka = gameScore[i].get("pvtMarka");
  var sendername = gameScore[i].get("senderName");

  var senderGST = gameScore[i].get("senderGST");
  var receiverName = gameScore[i].get("receiverName");
  var receiverGST = gameScore[i].get("receiverGST");
  var createdAt = gameScore[i].get("createdAt");

  a={
    GR_No:GR_No,
    from:from,
    route: route,
    description:description,
    nugType:nugType,
    nug:nug,
    weight:weight,
    ratePerKg:ratePerKg,
    freight:freight,
    format:format,
    pvtMarka:pvtMarka,
    sendername:sendername,
    senderGST:senderGST,
    receiverName:receiverName,
    receiverGST:receiverGST,
    createdAt:createdAt
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
  var GameScore = Parse.Object.extend("GRReports");
  var query = new Parse.Query(GameScore);
  var query1 = query.greaterThanOrEqualTo('createdAt',startdate);
 query1 = query1.lessThanOrEqualTo('createdAt',enddate);

  arr=[];
  
  query.find() 
  .then((gameScore) => {
    var length = gameScore.length;
    console.log(length);
    for(i=1;i<=length;i++){
   var GR_No = gameScore[i].get("GR_No");
   var from = gameScore[i].get("from");
   var route = gameScore[i].get("route");
   var description= gameScore[i].get("description");
    var nugType = gameScore[i].get("nugType");
    var nug = gameScore[i].get("nug");
    var weight = gameScore[i].get("weight");
    var ratePerKg = gameScore[i].get("ratePerKg");
    var freight = gameScore[i].get("freight");
    var format = gameScore[i].get("format");
    
    var pvtMarka = gameScore[i].get("pvtMarka");
    var sendername = gameScore[i].get("senderName");
  
    var senderGST = gameScore[i].get("senderGST");
    var receiverName = gameScore[i].get("receiverName");
    var receiverGST = gameScore[i].get("receiverGST");
    var createdAt = gameScore[i].get("createdAt");
  
    a={
      GR_No:GR_No,
      from:from,
      route: route,
      description:description,
      nugType:nugType,
      nug:nug,
      weight:weight,
      ratePerKg:ratePerKg,
      freight:freight,
      format:format,
      pvtMarka:pvtMarka,
      sendername:sendername,
      senderGST:senderGST,
      receiverName:receiverName,
      receiverGST:receiverGST,
      createdAt:createdAt
     }
      arr.push(a);
    
  }
  
  
  }).catch((ERR)=>{
    return res.send(JSON.stringify({arr:arr}));
  });
  
  });






server.listen(3000,function(){
  console.log('server running')
});
