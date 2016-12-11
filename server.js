//Port to listen (if Heroku choose first else choose second)
var PORT=process.env.PORT || 3000;
//Requiring express module
var express=require('express');
//using app var to set it to express function to make http calls
var app=express();
//making use of build in http module
//using express as a boiler plate
//whatever express listen to http too
var http=require('http').Server(app);

//for front end specifing folder
app.use(express.static(__dirname+"/public"));


http.listen(PORT,function(){
console.log("Listening at PORT "+PORT);
});