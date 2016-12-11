var socket=io();
var name=getQueryVariable('name') || "Anonymous";
var room=getQueryVariable('room');

//Message for client for succesful connection
socket.on("connect",function(){
console.log("User connected too");
});

//Console name and room
console.log(name+" wants to join room :"+room);

//Listening to message send from server
socket.on("message",function(message)
	{
		//Handling timestamp as recieved
var timestamp=moment.utc(message.timestamp);

console.log("Message recieved  ");
//Consoling message as recieved
console.log(message.text);
var $message=jQuery('.message-recieved');

//Consoling the message out to user on its page rather than developers tool
$message.append("<p><strong>"+message.name+":"+timestamp.local().format("h:mm a")+"</strong></p>");
$message.append("<p>"+message.text+"</p>")
	});

//Handling messages from submit button sended
//# for id
var $form=jQuery('#message-form');

//for managing messages from other clients
//on presssing submit button
$form.on("submit",function(event){

    //Preventing default handling of form as we want to handle it by ourself
	event.preventDefault();
	
	//Getting message from form
var message_send=$form.find("input[name]");
	
	//Sending message to other client
	socket.emit("message",{
		//Sending name
		name:name,
		//Sending message
		text:message_send.val()
	
	});

	//Making field null
	message_send.val('');
})