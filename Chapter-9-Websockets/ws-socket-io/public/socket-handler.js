(function() {
    "use strict";
    var socket = io("http://localhost:3000");

    socket.on("connect", function() {
        setTitle("Connected to Chat Server");
    });

    socket.on("disconnect", function() {
        setTitle("Disconnected");
    });

    socket.on("message", function(message) {
        printMessage(message);
    });

    document.forms[0].onsubmit = function() {
        var input = document.querySelector("#msg-input"),
            message = input.value;
        input.value = "";
        socket.emit("chat", message);
    };


    function setTitle(sMessage) {
        document.querySelector("h1#status").innerHTML = sMessage;
        document.title = sMessage;
    }

    function printMessage(sMessage) {
        var p = document.createElement("p");
        p.innerText = sMessage;
        document.querySelector("div#messages").appendChild(p);
    }
}());