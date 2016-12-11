var socket=io();

//Message for client for succesful connection
socket.on("connect",function(){
console.log("User connected too");
});

//Listening to message send from server
socket.on("message",function(message)
	{
console.log("Message recieved  ");
//Consoling message as recieved
console.log(message.text);
//Consoling the message out to user on its page rather than developers tool
jQuery('.message-recieved').append("<p>"+message.text+"</p>")
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
	
		//Sending message
		text:message_send.val()
	
	});

	//Making field null
	message_send.val('');
})