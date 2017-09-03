(function() {
    "use strict";

    var wsUrl = "ws://localhost:3500";

    var ws = new WebSocket(wsUrl);

    ws.onopen = function(message) {
        setTitle("Connected to Chat server");
    };

    ws.onclose = function(message) {
        setTitle("DISCONNECTED");
    };

    ws.onmessage = function(payload) {
        printMessage(payload.data);
    };

    document.forms[0].onsubmit = function() {
        var input = document.querySelector("#msg-input"),
            message = input.value;
        input.value = "";
        ws.send(message);
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