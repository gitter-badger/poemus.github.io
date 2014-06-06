var wsUri = "wss://java-amoz.rhcloud.com:8443/chat/chat";
var websocket = new WebSocket(wsUri);

var username;
websocket.onopen = function(evt) { onOpen(evt) };
websocket.onmessage = function(evt) { onMessage(evt) };
websocket.onerror = function(evt) { onError(evt) };
var output = document.getElementById("output");

function join() {
    username = document.getElementById("textField").value;
    websocket.send(username + " joined");
}

function send_message() {
    websocket.send(username + ": " + document.getElementById("textField").value);
}

function onOpen() {
    writeToScreen("Connected to " + wsUri);
}

function onMessage(evt) {
    console.log("onMessage: " + evt.data);
    if (evt.data.indexOf("joined") != -1) {
        document.getElementById("userField").innerHTML += evt.data.substring(0, evt.data.indexOf(" joined")) + "\n";
    } else {
        document.getElementById("chatlogField").innerHTML += evt.data + "\n";
    }
}

function onError(evt) {
    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
}

function writeToScreen(message) {
    output.innerHTML += message + "<br>";
}

