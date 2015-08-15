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
            HD_.Ajax.makeRequest('GET', familyDocs.ajax.buildUrl(_service.getDocumentsNames), onSuccess, onError, onFinished);
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
