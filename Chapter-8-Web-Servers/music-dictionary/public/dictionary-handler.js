(function() {
    "use strict";

    function addWordToDom(word) {
        var dictionaryContainer = document.querySelector("#dict-list");
        var wordHeader = document.createElement("h2"),
            term = document.createTextNode(word.term),
            definition = document.createTextNode(word.definition),
            dt = document.createElement("dt"),
            dd = document.createElement("dd");

        wordHeader.appendChild(term);
        dt.appendChild(wordHeader);
        dd.appendChild(definition);

        dictionaryContainer.appendChild(dt);
        dictionaryContainer.appendChild(dd);
    }

    function loadWords(aWords) {
        aWords = aWords || [];
        aWords.forEach(function(word) {
            addWordToDom(word);
        });
    }



    function addWord(sWord) {
        console.log("Adding word..!");
        var oData = {
            "term": document.querySelector("#term").value,
            "definition": document.querySelector("#definition").value,
        };

        var payload = JSON.stringify(oData);

        makeRequest("/dictionary-api", "POST", payload, function(xhr, statusCode, data) {
            var word = JSON.parse(data);
            addWordToDom(word);
        });
    }

    function deleteWord(sWord) {
        var sUrl = "/dictionary-api/" + sWord;
        makeRequest(sUrl, "DELETE", null, function(xhr, statusCode, data) {
            if (statusCode === 200) {
                var list = document.querySelector("#dict-list");
                list.innerHTML = "";
                var aWords = JSON.parse(data);
                loadWords(aWords);
            }
        }, errorHandler);
    }

    function makeRequest(sUrl, sMethod, oData, fnSuccessCallback, fnFailureCallback) {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', function() {
            console.log(`Response for ${this.responseURL} -> ${this.status}`);
            fnSuccessCallback(this, this.status, this.responseText)
        });
        xhr.addEventListener('error', fnFailureCallback);
        xhr.open(sMethod, sUrl);
        console.log(`${sMethod} -> ${sUrl}`);
        if (oData) {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(oData);
        } else {
            xhr.send(null);
        }
    }

    function errorHandler(err) {
        console.log(err);
        alert("Error happened");
    }

    function loadDictionary() {
        console.log("Loading dictionary....!");
        makeRequest("/dictionary-api", "GET", null, function(xhr, statusCode, data) {
            if (statusCode >= 200 && statusCode !== 404) {
                var words = JSON.parse(data);
                loadWords(words);
            } else {

            }
        }, errorHandler);
    }


    function addClickEvent() {
        var dt = document.querySelector("#dict-list");
        dt.addEventListener('click', function(event) {
            if (event.target && event.target.parentElement.nodeName === "DT") {
                var sTerm = event.target.innerText;
                deleteWord(sTerm);
            }
        });
    }

    function attachHandlers() {
        if (document.addEventListener) {
            //document.addEventListener("DOMContentLoaded", loadDictionary, false);
            loadDictionary();
        } else {
            window.addEventListener('load', loadDictionary, false);
        }

        document.querySelector("#addWord").addEventListener("click", addWord);
        addClickEvent();
    };

    attachHandlers();
}());