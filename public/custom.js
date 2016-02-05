var app= 'com.bucketlist.app';
var access='96a14426-9ebb-4024-89da-fcc0610e8549';
var button = document.getElementById('chatName');
var chatName =
button.addEventListener('click', function(){
  var input = document.getElementById('userInput').value;
  enterChat(input);
  console.log("********");
  console.log(input);
  // get user input
  // call enterChat and pass in user input
})


function enterChat(chatName){
    window.cloudilly= new Cloudilly();
    var chatbox= document.getElementById('chatbox');
    cloudilly.initialize(app, access, function(){
      chatbox.innerHTML= chatbox.innerHTML + 'Connecting...<br/>';
      chatbox.scrollTop= chatbox.scrollHeight;
      cloudilly.connect();
    });
    cloudilly.socketConnected(function(err, res) {
      if(err) { console.log("ERROR: " + res.msg); return; }
      console.log("@@@@@@ CONNECTED");
      console.log(res);
      chatbox.innerHTML= chatbox.innerHTML + "CONNECTED AS " + chatName + "<br/>";
      chatbox.scrollTop= chatbox.scrollHeight;
      cloudilly.join("public", function(err, res) {
        if(err) { console.log("ERROR: " + res.msg); return; }
        console.log("@@@@@@ JOIN");
        console.log(res);
        chatbox.innerHTML= chatbox.innerHTML + "DEVICES PRESENT IN PUBLIC CHAT: " + res.total_devices + "<br/>";
        chatbox.scrollTop= chatbox.scrollHeight;
      });
    });
    cloudilly.socketDisconnected(function() {
      console.log("@@@@@@ CLOSED");
      chatbox.innerHTML= 'DISCONNECTED<br/>';
      chatbox.scrollTop= chatbox.scrollHeight;
    });
    cloudilly.socketReceivedDevice(function(res) {
      console.log("@@@@@@ RECEIVED DEVICE");
      console.log(res);
      var other= res.device.toUpperCase();
      chatbox.innerHTML= res.timestamp== 0 ? chatbox.innerHTML + 'Someone Says:' + " JOINED PUBLIC<br/>" : chatbox.innerHTML + other + " LEFT PUBLIC<br/>";
      chatbox.scrollTop= chatbox.scrollHeight;
    });
    cloudilly.socketReceivedPost(function(res) {
      console.log("@@@@@@ RECEIVED POST");
      console.log(res);
      var other= res.device.toUpperCase();
      chatbox.innerHTML= chatbox.innerHTML + 'Someone Says' + ': ' + res.payload.msg + '<br/>';
      chatbox.scrollTop= chatbox.scrollHeight;
    });
}
  function send() {
    var input= document.getElementById("input").value; if(input== "") { return; }
    document.getElementById("input").value= ""; document.getElementById("input").focus();
    var payload= {}; payload.msg= input;
    cloudilly.post("public", payload, function(err, res) {
      if(err) { console.log("ERROR: " + res.msg); return; }
      console.log("@@@@@@ POST");
      console.log(res);
    });
  }
