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
//Requiring socket to use it
var io=require('socket.io')(http);

//for front end specifing folder
app.use(express.static(__dirname+"/public"));

//When user load page localhost:3000 it sends connection message and below function gets call
//Only if socket is installed for front end too
//socket is basically each client getting connected to server
io.on("connection",function(socket){
	console.log("Client connecting to server");

//Recieved message from clients
	socket.on("message",function(message){

//Output it on cmd
console.log("message recieved from client:"+message.text);

//Send it to everyone except one that had actually send it
//socket.broadcast.emit('message',message);

//Send it to everyone and one that had actually send it too
io.emit('message',message);
	});

//Send message to client
	socket.emit("message",{
		text:"Connected to chat app"
	})
})
//Local host starting
http.listen(PORT,function(){
console.log("Listening at PORT "+PORT);
});