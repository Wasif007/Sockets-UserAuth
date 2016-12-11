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
//Requiring timestamp moment to use it
var moment=require('moment');

//for front end specifing folder
app.use(express.static(__dirname+"/public"));

//Getting list of sockets id in it with each having name and room key value pairs
var clientInfo={};

//When user load page localhost:3000 it sends connection message and below function gets call
//Only if socket is installed for front end too
//socket is basically each client getting connected to server
io.on("connection",function(socket){
	console.log("Client connecting to server");


//Handling certain room joining request
socket.on("joinRoom",function(req){

//'asdasd':{name:req.name,room:req.room}
clientInfo[socket.id]=req

//Making group as a room
socket.join(req.room);

//Emiting message to specific room only because of to(req.room)
socket.broadcast.to(req.room).emit("message",{
text:req.name+" has joined",
timestamp:moment.valueOf(),
name:"System"
});

});

//Recieved message from clients
	socket.on("message",function(message){

//Output it on cmd
console.log("message recieved from client:"+message.text);

//Send it to everyone except one that had actually send it
//socket.broadcast.emit('message',message);

//Adding timestamp for each message as send by client
message.timestamp=moment.valueOf();

//Send it to everyone and one that had actually send it too
//Adding specfic room functionalety by getting socket id
io.to(clientInfo[socket.id].room).emit('message',message);
	});

//Send message to client
	socket.emit("message",{
		name:"System",
		text:"Connected to chat app",
		timestamp:moment.valueOf()
	})
})
//Local host starting
http.listen(PORT,function(){
console.log("Listening at PORT "+PORT);
});