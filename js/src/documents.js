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
        create : function(mainPanel) {
            var documents = HD_.MapCollection.create();

            documents.loadFromDatabase = function() {
                var that = this;
                familyDocs.ajax.getAllDocumentsNames(function onSuccess(responseText) {
                    var docNames = responseText.split(",");
                    familyDocs.ajax.getDocuments(docNames, function processElement(docName, docJson) {
                        var doc = familyDocs.doc.create(docJson);
                        that.addElement(docName, doc);
                        mainPanel.addAndShow(familyDocs.docPanel.create(
                            doc.getDescription(),
                            doc.getImageSource(),
                            doc.getThumbnailSource())
                        );
                    }, function onFinished() {
                        // Rien
                    }, function onError() {
                        // Rien
                    }, function onAllFinished() {
                        console.log("loadFromDatabase - onAllFinished: ajax.getAllDocumentsNames...");
                        that.eachElement(function(doc) {
                            console.log(doc.getDescription());
                        });
                    });
                }, function onError() {
                    console.log("loadFromDatabase - Error: ajax.getAllDocumentsNames");
                }, function onFinished() {
                    console.log("loadFromDatabase - onFinished...");
                });
            };

            return documents;
        }
    };
})();