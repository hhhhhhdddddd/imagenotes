familyDocs.ajax = (function() {

    var _source = familyDocs.debugMode ?
        "http://localhost/imagenotes/" :
        "http://canevorepa.free.fr/imagenotes/";

    var _service = {
        getAllDocumentsNames : "getalldocumentnames.php",
        getdocument : "getdocument.php"
    };

    function _buildGetValueUrl(service, name, value) {
        return _source + service + "?" + name + "=" + value;
    }

    function _findRequestValue(request) {
        return request.split("=")[1];
    }

    function _buildUrl(service) {
        return _source + service;
    }

    return {

        getAllDocumentsNames : function(onSuccess, onError, onFinished) {
            HD_.Ajax.makeRequest('GET', _buildUrl(_service.getAllDocumentsNames), onSuccess, onError, onFinished);
        },

        getDocuments : function(imgNames, processElement, onFinished) {
            var urls = [];
            imgNames.forEach(function(imgNames) {
                var request = _buildGetValueUrl(_service.getdocument, "docname", imgNames);
                urls.push(request);
            });

            HD_.Ajax.chainRequests("GET", urls, function onEachSuccess(request, responseText) {
                var reqval = _findRequestValue(request);
                processElement(reqval, responseText);
            }, onFinished, null);
        }
    };
})();
