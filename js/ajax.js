familyDocs.ajax = (function() {

    // var _source = "http://canevorepa.free.fr/familydocs/"; // prod
    var _source = "http://localhost/imagenotes/"; // local
    var _service = {
        getDocumentsNames : "getdocumentnames.php",
        getdocument : "getdocument.php"
    };

    return {
        buildGetValueRequest : function(service, name, value) {
            return _source + service + "?" + name + "=" + value;
        },

        findRequestValue : function(request) {
            return request.split("=")[1];
        },

        buildGetRequest : function(service) {
            return _source + service;
        },

        getDocumentsNames : function(onSuccess, onError, onFinished) {
            this.getRequest(familyDocs.ajax.buildGetRequest(_service.getDocumentsNames), onSuccess, onError, onFinished);
        },

        getRequest : function(url, onSuccess, onError, onFinished) {
            // Instances of XMLHttpRequest can make an HTTP request to the server.
            var httpRequest = new XMLHttpRequest();

            // Tells the HTTP request object which JavaScript function will handle processing the response. 
            httpRequest.onreadystatechange = function responseHandler() {
                if (httpRequest.readyState === 4) {
                    if (httpRequest.status === 200) {
                        onSuccess(httpRequest.responseText);
                        onFinished();
                    } else {
                        onError();
                        onFinished();
                    }
                }
            };

            // Actually make the request.
            httpRequest.open('GET', url);
            httpRequest.send();
        },

        getDocuments : function(imgNames, processElement, onFinished) {
            var requests = [];
            imgNames.forEach(function(imgNames) {
                var request = familyDocs.ajax.buildGetValueRequest(_service.getdocument, "docname", imgNames);
                requests.push(request);
                console.log("req: " + request);
            });

            this.processIterator(requests, function onSuccess(request, responseText) {
                var reqval = familyDocs.ajax.findRequestValue(request);
                console.log("reqval: " + reqval);

                processElement(reqval, responseText);
            }, onFinished, null);
        },

        processIterator : function(requests, onSuccess, onFinished, onError) {

            function createIterator(anArray) {
                var iterator = Object.create(null);
                iterator.position = 0;
                iterator.list = anArray;

                iterator.hasNext = function() {
                    return this.position < this.list.length;
                };
                
                iterator.next = function() {
                    return this.list[this.position++];
                };

                return iterator;
            }

            function processIteratorAux() {
                if (! iterator.hasNext()) {
                    onFinished();
                    return;
                }

                var request = iterator.next();
                familyDocs.ajax.getRequest(request, function fullOnSuccess(responseText) {
                    onSuccess(request, responseText);

                    processIteratorAux();
                }, function onError() {
                    console.log("_processIterator - Ajax Error: " + request);
                }, function onFinished() {

                });
            }

            var iterator = createIterator(requests);
            processIteratorAux();
        }
    };
})();
