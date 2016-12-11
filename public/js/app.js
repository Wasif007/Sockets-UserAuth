var socket=io();

//Message for client for succesful connection
socket.on("connect",function(){
console.log("User connected too");
});