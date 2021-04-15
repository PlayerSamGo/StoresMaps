const fs = require('fs');
const config = require('./scripts/setConfig.json');

//Load dependencies 
const mongoose = require('mongoose');
const port = config.port;

let app = require('./app');

let server = require('http').createServer(app); //Server with express

//Init for start user creation before launch project 

//Connection db
mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb_url, {useNewUrlParser: true, useUnifiedTopology: true },(err,res) =>{
    if(err){
      throw err;
    }
    else{
      console.log("Conection sucessfull");
      server.listen(port, function(){
        console.log("Api Rest server listen on http://localhost:"+port);
      })
    }
  });
  