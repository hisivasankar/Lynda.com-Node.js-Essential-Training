(function() {
    "use strict";

    function loadWords(aWords) {
        aWords = aWords || [];
        var dictionaryContainer = document.querySelector("#dict-list");
        aWords.forEach(function(word) {
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
        });
    }

    function addWord(sWord) {
    	console.log("Adding word..!");
    	/*var oData = {
    		"term": document.querySelector("#term").textContent,
    		"definition": document.querySelector("#definition").textContent,
    	};*/

    	var oData = {
    		"term": "stupid"
    	};

    	var payload = JSON.stringify(oData);

    	makeRequest("/dictionary-api", "POST", payload, function(xhr, statusCode, data){
    		console.log("Done!");
    	});
    }

    function deleteWord(sWord) {

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
        if(oData) {
        	xhr.setRequestHeader("Content-Type", "text/plain");
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

    function attachHandlers() {
        if (document.addEventListener) {
            //document.addEventListener("DOMContentLoaded", loadDictionary, false);
            loadDictionary();
        } else {
            window.addEventListener('load', loadDictionary, false);
        }

        document.querySelector("#addWord").addEventListener("click", addWord);
    };

    attachHandlers();
}());