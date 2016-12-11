var socket=io();

//Message for client for succesful connection
socket.on("connect",function(){
console.log("User connected too");
});

//Listening to message send from server
socket.on("message",function(message)
	{
console.log("Message recieved  ");
console.log(message.text);
	});