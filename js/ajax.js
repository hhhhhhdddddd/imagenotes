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

        getDocuments : function(elements, processElement, onFinished) {
            this.processIterator(elements, _service.getdocument, "docname", function getValue(docName) {
                return docName;
            }, processElement, onFinished);
        },

        processIterator : function(elements, service, name, getValue, processElement, onFinished) {

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

                var itElement = iterator.next();
                var request = familyDocs.ajax.buildGetValueRequest(service, name, getValue(itElement));
                familyDocs.ajax.getRequest(request, function onSuccess(responseText) {
                    processElement(itElement, responseText);

                    processIteratorAux();
                }, function onError() {
                    console.log("_processIterator - Ajax Error: " + request);
                }, function onFinished() {

                });
            }

            var iterator = createIterator(elements);
            processIteratorAux();
        }
    };
})();
