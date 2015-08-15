familyDocs.documents = (function() {

    function _findContainers() {
        return document.getElementsByClassName("doccontainer");
    }

    function _eachDocContainer(fun) {
        var containers = document.getElementsByClassName("doccontainer");
        for (var i = 0; i < containers.length; i++) {
            fun(containers[i]);
        }
    }

    return {
        create : function() {
            var documents = Object.create(null);
            familyDocs.list.init(documents);

            documents.loadFromDatabase = function() {
                var that = this;
                familyDocs.ajax.getAllDocumentsNames(function onSuccess(responseText) {
                    var docNames = responseText.split(",");
                    familyDocs.ajax.getDocuments(docNames, function processElement(docName, docJson) {
                        var doc = familyDocs.doc.create(docJson);
                        that.add(docName, doc);
                        document.body.appendChild(doc.buildNode());
                    }, function onFinished() {
                        // Rien
                    });
                }, function onError() {
                    console.log("loadFromDatabase - Error: ajax.getAllDocumentsNames");
                }, function onFinished() {
                    console.log("loadFromDatabase - Finished: ajax.getAllDocumentsNames");
                });
                /////////////////
                // HD_.Ajax.chainRequests("GET", urls, function onSuccess(request, responseText) {
                //     var reqval = _findRequestValue(request);
                //     console.log("reqval: " + reqval);

                //     processElement(reqval, responseText);
                // }, onFinished, null);
                
            };

            return documents;
        }
    };
})();
