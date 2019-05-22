const express = require('express'); 
const Parse = require('parse/node');
const app = express();
const http = require('http');
const server = http.Server(app);
const APP_ID = 'yzSgYjxLgfCBjZglhpjns8OKE7fbGi5L0HLdWX9n';
const JAVASCRIPT_KEY = "6s0vo0r6hpnUm99lvijDwL7pB7KRXvdmjb6Jr1wN";
const excel = require('node-excel-export');
const fs= require('fs');
console.info("Initializing Application", APP_ID);
Parse.initialize(APP_ID, JAVASCRIPT_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/'
global.specification;
var dataset=[];
global.heading;
const Event = Parse.Object.extend("GRItems");
const event = new Event();
const eventQuery = new Parse.Query(Event);

app.get('/main',function(req,res){ 

var GameScore = Parse.Object.extend("GRItems");
var query = new Parse.Query(GameScore);


query.find() 
.then((gameScore) => {
  var length = gameScore.length;
  for(i=0;i<=length;i++){
  
  var objectId = gameScore[i].id;
  var senderName = gameScore[i].get("senderName");
  var nug = gameScore[i].get("nug");
  var hsn = gameScore[i].get("hsn");
  var subtotal = gameScore[i].get("subtotal");
  var total = gameScore[i].get("total");
  var pieces = gameScore[i].get("pieces");
  /*gritems.push(objectId,senderName,nug,hsn,subtotal,total,pieces);
  data=objectId+'\t'+senderName+'\t'+nug+'\t'+hsn+'\t'+subtotal+'\t'+total+'\t'+pieces+'\n';
  fs.appendFile('gritem1.xslx',data,(err)=>{
    if(err) throw err;
    console.log('file created');
  })  */
 


dataset.push([{
  objectId:objectId,
  senderName:senderName,
  nug:nug,
   hsn:hsn,
   subtotal:subtotal,
   total:total,
   pieces:pieces}
  ]);
  heading = [

    ['objectId', 'senderName', 'nug','hsn','subtotal','total','pieces'] // <-- It can be only values
  ];
  specification = {
    objectId: {
      displayName: 'objectId',
      width: 100 
    },
    senderName: {
      displayName: 'senderName',
      width: 100
    },
    nug: {
      displayName: 'nug',
      width: 100 
    },
    hsn: {
      displayName: 'hsn',
      width: 100 
    },
    subtotal: {
      displayName: 'subtotal',
      width: 100 
    },
    total: {
      displayName: 'total',
      width: 100 
    },
    pieces: {
      displayName: 'pieces',
      width: 100 
    }
  }
  report = excel.buildExport(
    [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
      {
        name: 'GRItems', // <- Specify sheet name (optional)
        heading: heading, // <- Raw heading array (optional)
        specification: specification, // <- Report specification
        data: dataset // <-- Report data
      }
    ]
  );
 console.log(dataset);
 
  
}


}, (error) => {
  console.log('file not found');
});
setTimeout(function(){
console.log("value of dataset"+dataset);



res.attachment('GRItems.xlsx'); // This is sails.js specific (in general you need to set headers)
return res.send(report);
},5000);
});

server.listen(3000,function(){
  console.log('server running')
});
