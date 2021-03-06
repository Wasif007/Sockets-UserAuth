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

//Users
function sendingnumUsers(socket)
{
	//Getting id of user
	var info=clientInfo[socket.id];
	//Storing it in array
	var users=[];

	if(typeof info==='undefined')
	{
		return;
	}

//Using build in function to get attributes of clientId
	Object.keys(clientInfo).forEach(function(socketId){
		var userInfo=clientInfo[socketId];
		if(userInfo.room===info.room){
			users.push(userInfo.name);
		}
	});
	socket.emit("message",{
		text:"users are "+users.join(', '),
		timestamp:moment.valueOf(),
		name:"System"
	});
}

//When user load page localhost:3000 it sends connection message and below function gets call
//Only if socket is installed for front end too
//socket is basically each client getting connected to server
io.on("connection",function(socket){
	console.log("Client connecting to server");

//Handling left chat room functionalety
//disconnect is built in event called when left 
socket.on("disconnect",function(){
if(typeof clientInfo[socket.id] !== 'undefined')
{

//Leave chat room with following line of code
	socket.leave(clientInfo[socket.id].room);


//Emiting message to specific room only because of to(req.room)
socket.broadcast.to(clientInfo[socket.id].room).emit("message",{
text:clientInfo[socket.id].name+" has left",
timestamp:moment.valueOf(),
name:"System"
});

}
//Deleting it from client id the id of socket
delete clientInfo[socket.id];

});



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

//@currentusers for checking users in the current room
if(message.text==='@currentusers')
{
//calling function
sendingnumUsers(socket);
}else
{
//Output it on cmd
console.log("message recieved from client:"+message.text);

//Send it to everyone except one that had actually send it
//socket.broadcast.emit('message',message);

//Adding timestamp for each message as send by client
message.timestamp=moment.valueOf();

//Send it to everyone and one that had actually send it too
//Adding specfic room functionalety by getting socket id
io.to(clientInfo[socket.id].room).emit('message',message);


}
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