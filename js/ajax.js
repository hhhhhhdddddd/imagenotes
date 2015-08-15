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

        buildUrl : function(service) {
            return _source + service;
        },

        getDocumentsNames : function(onSuccess, onError, onFinished) {
            this.getRequest(familyDocs.ajax.buildUrl(_service.getDocumentsNames), onSuccess, onError, onFinished);
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
            var urls = [];
            imgNames.forEach(function(imgNames) {
                var request = familyDocs.ajax.buildGetValueRequest(_service.getdocument, "docname", imgNames);
                urls.push(request);
                console.log("req: " + request);
            });

            HD_.Ajax.chainRequests("GET", urls, function onSuccess(request, responseText) {
                var reqval = familyDocs.ajax.findRequestValue(request);
                console.log("reqval: " + reqval);

                processElement(reqval, responseText);
            }, onFinished, null);
        }
    };
})();
